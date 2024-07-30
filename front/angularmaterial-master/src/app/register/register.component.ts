import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    const user = { username: this.username, email: this.email, password: this.password };
    this.authService.register(user)
      .subscribe(
        (response) => {
          // Gérer la réponse réussie ici, par exemple, rediriger vers la page de connexion
          console.log('Registration successful');
          this.router.navigate(['/login']);
        },
        (error) => {
          // Gérer les erreurs ici
          console.error('Registration failed:', error);
          this.errorMessage = 'Registration failed. Please try again later.';
        }
      );
  }
}
