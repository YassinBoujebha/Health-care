import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe(
        (response) => {
          console.log('Login successful');
          this.router.navigate(['/home']);
        },
        (error) => {
          
          console.error('Login failed:', error);
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      );
  }
}
