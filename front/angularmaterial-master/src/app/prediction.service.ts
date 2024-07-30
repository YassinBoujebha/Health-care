import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';  
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  uploadFile(file: File, fileType: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const username = this.authService.getUsername();
    if (username) {
      formData.append('username', username);
    } else {
      console.error('Username not found');
      return throwError('Username not found');
    }

    formData.append('fileType', fileType);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    console.log('Uploading file:', file.name);
    console.log('With username:', username);
    console.log('With fileType:', fileType);

    let url: string;
    if (fileType === 'scanner') {
      url = 'http://localhost:3000/upload';
    } else if (fileType === 'nfs') {
      url = 'http://localhost:3000/upload';
    } else {
      console.error('Invalid fileType');
      return throwError('Invalid fileType');
    }

    return this.http.post<any>(url, formData, { headers }).pipe(
      catchError(error => {
        console.error('Error occurred during file upload:', error);
        return throwError(error);
      })
    );
  }

  setPrediction(prediction: any, fileType: string) {
    localStorage.setItem(`prediction_${fileType}`, JSON.stringify(prediction));
  }

  getPrediction(fileType: string) {
    const prediction = localStorage.getItem(`prediction_${fileType}`);
    return prediction ? JSON.parse(prediction) : null;
  }
}
