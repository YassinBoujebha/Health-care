import { Component, OnInit } from '@angular/core';
import { PredictionService } from '../prediction.service';

@Component({
  selector: 'app-resultat2',
  templateUrl: './resultat2.component.html',
  styleUrls: ['./resultat2.component.css']
})
export class Resultat2Component implements OnInit {
  prediction: any;

  constructor(private predictionService: PredictionService) {}

  ngOnInit(): void {
    this.prediction = this.predictionService.getPrediction('scanner');
    console.log('Loaded prediction:', this.prediction); // débug
  }

  getSupportMessage(): string {
    if (this.prediction.class === 1) {
      return 'Nous sommes désolés d\'annoncer que la présence d\'une tumeur cérébrale a été détectée. Nous vous recommandons de consulter un spécialiste dès que possible.';
    } else {
      return 'Bonne nouvelle ! Aucune tumeur cérébrale n\'a été détectée. Continuez à prendre soin de votre santé.';
    }
  }
}
