import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
    usuario:any
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    let usu=localStorage.getItem('usuario')
    if (usu) {
       this.usuario=JSON.parse(usu) 
    }
    if (this.authService.isLoggedIn() && this.usuario.rol =="local" ) {
      return true; // Si el usuario está autenticado, permite el acceso a la ruta
    } else {
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión si no está autenticado
      return false;
    }
  }
}