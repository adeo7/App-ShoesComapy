import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000';
  private userData={}

  constructor(private http:HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, credentials)
      .pipe(
        tap(res => this.saveToken(res.token)),
        tap(res => this.saveUserData(res.user))
      );
  }

  private saveToken(token: string): void {
    localStorage.setItem('authToken', token); // Guardar el token en el almacenamiento local
  }
  private saveUserData(user: any): void {
    this.userData = user; // Guardar los datos del usuario en el servicio
  }
  getToken(): string | null {
    return localStorage.getItem('authToken'); // Obtener el token almacenado
  }
  getUserData(): any {
    return this.userData;
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Eliminar el token al cerrar sesión
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Verificar si hay un token presente
  }
}
