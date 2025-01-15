import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, password: string): boolean {
    // Logica di login: controlla username e password
    // Ad esempio, usa un servizio backend per la validazione, ma per ora assumiamo che i dati siano giusti.
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('isAuthenticated');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}
