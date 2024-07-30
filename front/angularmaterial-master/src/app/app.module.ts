import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { MatIconModule } from '@angular/material/icon';
import { Resultat1Component } from './resultat1/resultat1.component';
import { Resultat2Component } from './resultat2/resultat2.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        HomeComponent,
        HeaderComponent,
        AboutComponent,
        Resultat1Component,
        Resultat2Component,
        WelcomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        FlexLayoutModule,
        HttpClientModule,
        FormsModule,
        FlexLayoutModule,
        MatIconModule,
        MatFormFieldModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
