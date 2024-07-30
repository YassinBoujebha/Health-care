import { Component, OnInit } from '@angular/core';
import { PredictionService } from '../prediction.service';

@Component({
  selector: 'app-resultat1',
  templateUrl: './resultat1.component.html',
  styleUrls: ['./resultat1.component.css']
})
export class Resultat1Component implements OnInit {
  prediction: any;

  constructor(private predictionService: PredictionService) { }

  ngOnInit(): void {
    this.prediction = this.predictionService.getPrediction('nfs');
  }
}
