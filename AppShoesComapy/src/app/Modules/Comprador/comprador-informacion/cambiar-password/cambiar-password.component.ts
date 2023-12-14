import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit{
  mostrarContrasena = false;
  formPass:FormGroup

  constructor(private toars:ToastrService){
    this.formPass=new FormGroup({
    passw:new FormControl(null,[Validators.required]),  
    confiPassw:new FormControl(null,[Validators.required]),  
    newPass:new FormControl(null,[Validators.required]) 
    })
  }
  ngOnInit(): void {
    
  }
  cambiarPassw(){
    let passw=this.formPass.controls['passw'].value
    let confiPassw=this.formPass.controls['confiPassw'].value
    if (this.formPass.invalid) {
      this.toars.warning('Por favor Completa todos los campos', 'ShoesCompany')
    }
    if (passw!=confiPassw) {
      this.toars.warning('Las contraseñas deben ser iguales', 'ShoesCompany')
    }

  }
  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}
