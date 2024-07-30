import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public aboutInfo: string = "Bienvenue sur notre application. Nous sommes une équipe passionnée qui crée des solutions innovantes pour nos utilisateurs.";

  constructor() { }

  ngOnInit(): void {
  }
}
