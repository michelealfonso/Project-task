import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Metodo chiamato quando l'utente invia il form di login
  login(): void {

    const isAuthenticated = this.authService.login(this.username, this.password);

    if (isAuthenticated) {
      this.router.navigate(['/dashboard']); // Reindirizza alla dashboard
    } else {
      this.errorMessage = 'Credenziali errate!'; // Mostra un errore in caso di credenziali non valide
    }
  }

}
