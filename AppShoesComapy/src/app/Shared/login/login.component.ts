import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // mostrar contraseña
  mostrarContrasena = false;

  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  // -----
  public frmLongin: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.frmLongin = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }
  ngOnInit(): void {

  }
  login(): void {
    let credentials = {
      "username": this.frmLongin.controls['username'].value,
      "password": this.frmLongin.controls['password'].value
    }
    if (this.frmLongin.invalid) {
      return
    }
    this.authService.login(credentials).subscribe(result => {
      let dato=this.authService.getUserData()
      localStorage.setItem("usuario",JSON.stringify(dato));
      this.router.navigateByUrl('Vendedor')
    },
      error => {
        console.log(error)
      });
  }
}
