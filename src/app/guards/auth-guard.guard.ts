import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // qui vorrei provare a gestire il login con gli observable ma per ora mi limito da farlo in modo sincrono 

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (this.authService.isAuthenticated()) {
      return true; // Permetti l'accesso alla dashboard
    } else {
      this.router.navigate(['/login']); // Se non è autenticato, vai alla pagina di login
      return false;
    }
  }
}
