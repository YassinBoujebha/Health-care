import { Component } from '@angular/core';
import { PredictionService } from '../prediction.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedFileNfs: File | null = null;
  selectedFileScanner: File | null = null;

  constructor(
    private predictionService: PredictionService,
    private router: Router,
    private authService: AuthService
  ) {}

  triggerFileInput(inputId: string) {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any, fileType: string) {
    const file: File = event.target.files[0];
    if (fileType === 'nfs') {
      this.selectedFileNfs = file;
    } else if (fileType === 'scanner') {
      this.selectedFileScanner = file;
    }
  }

  uploadFile(fileType: string) {
    let selectedFile: File | null = null;
    if (fileType === 'nfs') {
      selectedFile = this.selectedFileNfs;
    } else if (fileType === 'scanner') {
      selectedFile = this.selectedFileScanner;
    }

    if (selectedFile) {
      this.predictionService.uploadFile(selectedFile, fileType).subscribe(
        (response: any) => {
          this.predictionService.setPrediction(response, fileType);
          if (fileType === 'nfs') {
            this.router.navigate(['/resultat1']);
          } else if (fileType === 'scanner') {
            this.router.navigate(['/resultat2']);
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
}
