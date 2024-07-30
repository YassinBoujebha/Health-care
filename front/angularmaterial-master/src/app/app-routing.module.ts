import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { Resultat1Component } from './resultat1/resultat1.component';
import { Resultat2Component } from './resultat2/resultat2.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'resultat1', component: Resultat1Component },
  { path: 'resultat2', component: Resultat2Component },
  {path:'welcome',component: WelcomeComponent},
  { path: '', redirectTo: '/welcome', pathMatch: 'full' } // Redirection par défaut vers la page d'accueil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
