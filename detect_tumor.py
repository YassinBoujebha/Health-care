import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import io
from PIL import Image
import numpy as np
import tensorflow as tf

app = Flask(__name__)

MODEL_PATH = r"C:\Users\MSI\Desktop\brain.h5"
model = tf.keras.models.load_model(MODEL_PATH)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files or 'username' not in request.form:
        return jsonify(error="No file or username provided"), 400
    
    file = request.files['file']
    username = request.form['username']
    
    if file.filename == '':
        return jsonify(error="No selected file"), 400

    try:
        print(f'Received file: {file.filename}')
        print(f'Received username: {username}')

        filename = secure_filename(file.filename)
        
        img_bytes = file.read()
        img = Image.open(io.BytesIO(img_bytes))
        
        img = img.resize((224, 224))
        img = np.array(img) / 255.0
        img = np.expand_dims(img, axis=0)
        
        prediction = model.predict(img)
        predicted_class = np.argmax(prediction, axis=1)[0]
        confidence = np.max(prediction)

        print(f'Prediction: {predicted_class}, Confidence: {confidence}')

        return jsonify({
            'class': int(predicted_class),
            'confidence': float(confidence),
            'username': username
        })
    except Exception as e:
        print(f'Error during prediction: {e}')
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
