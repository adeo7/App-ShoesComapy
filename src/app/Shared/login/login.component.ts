import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/auth.service';
import { GetLocalesService } from 'src/app/Core/get-locales.service';
import { LocalesService } from 'src/app/Core/locales.service';

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

  constructor(private authService: AuthService, private router: Router,
              private getlocale:GetLocalesService,
              private serviceLocal:LocalesService,
              private toars:ToastrService
    ) {
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
      this.toars.error('Por favor completa los campos','ShoesComapny')
      return
    }
    this.authService.login(credentials).subscribe(result => {
      let dato=this.authService.getUserData()
      this.toars.success('Bienvenido '+dato.username,'ShoesCompany')
      if (dato.rol=="local") {
        localStorage.setItem("usuario",JSON.stringify(dato));
        this.datosLocal(dato.id);
      this.router.navigateByUrl('vendedor') 
      }else{
        localStorage.setItem("usuario",JSON.stringify(dato));
        this.router.navigateByUrl('') 
      }
    },
      error => {
        let err=error.error.error
        this.toars.error(err,'ShoesCompany')
      });
  }
  datosLocal(id:any){
    let locales:any[]=[]
    let local
    this.serviceLocal.getAll().subscribe(result=>{
      locales=result
      locales.forEach(element => {
        if(element.usuario_id=id){
          local=element
          localStorage.setItem('local',JSON.stringify(local))
        }
      });
    },error=>{
      console.log(error)
    })
  }
}
