const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const authRoutes = require('./server/routes/auth');
app.use('/api/auth', authRoutes);


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const PredictionSchema = new mongoose.Schema({
  fileName: String,
  predictionClass: Number,
  confidence: Number,
  date: { type: Date, default: Date.now },
  username: String
});

const Prediction = mongoose.model('Prediction', PredictionSchema);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post('/upload', authenticateToken, upload.single('file'), (req, res) => {
    const file = req.file;
    const username = req.user.username; 
    
    if (!file) {
        console.log('No file uploaded');
        return res.status(400).send({ error: 'No file uploaded' });
    }
  
    console.log('Received file:', file.originalname);
    console.log('Received username:', username);
  
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    formData.append('username', username);

    const fileType = req.body.fileType;
    let url;
    if (fileType === 'scanner') {
        url = 'http://localhost:5000/predict';
    } else if (fileType === 'nfs') {
        url = 'http://localhost:5001/predict';
    } else {
        console.error('Invalid fileType');
        return res.status(400).send({ error: 'Invalid fileType' });
    }
  
    axios.post(url, formData, {
        headers: formData.getHeaders()
    })
    .then(response => {
        console.log('Prediction response:', response.data);
        const prediction = response.data;
  
        const newPrediction = new Prediction({
            fileName: file.originalname,
            predictionClass: prediction.class,
            confidence: prediction.confidence,
            username: username 
        });
  
        newPrediction.save()
            .then(() => console.log('Prediction saved to MongoDB'))
            .catch(err => console.log(err));
  
        res.send(prediction);
    })
    .catch(error => {
        console.error('Error during prediction request:', error);
        res.status(500).send({ error: 'Failed to get prediction' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
