import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/Core/usuario.service';

@Component({
  selector: 'app-informacion-comprador',
  templateUrl: './informacion-comprador.component.html',
  styleUrls: ['./informacion-comprador.component.css']
})
export class InformacionCompradorComponent implements OnInit {
  usuario:any;
  FormUsuario:FormGroup
  
  constructor(private usuarioService:UsuarioService,
              private toars:ToastrService
    ){
      this.FormUsuario=new FormGroup({
        nombreUsuario:new FormControl(null,[Validators.required]),
        nombre:new FormControl(null,[Validators.required]),
        apellidos:new FormControl(null,[Validators.required]),
        tipo:new FormControl(null,[Validators.required]),
        NumDoc:new FormControl(null,[Validators.required]),
        correo:new FormControl(null,[Validators.required]),
        telefono:new FormControl(null,[Validators.required]),
        direccion:new FormControl(null,[Validators.required]),
      })
    }

  ngOnInit(): void {
    this.traerInfo()
  }
  traerInfo(){
    let usu=localStorage.getItem('usuario')
    if (usu) {
      this.usuario=JSON.parse(usu)
    }
    this.usuarioService.getById(this.usuario.id).subscribe(result=>{
      this.FormUsuario.controls['nombreUsuario'].setValue(result.username)
      this.FormUsuario.controls['nombre'].setValue(result.nombre_usuario)
      this.FormUsuario.controls['apellidos'].setValue(result.apellido_usuario)
      this.FormUsuario.controls['tipo'].setValue(result.tipo_documento)
      this.FormUsuario.controls['NumDoc'].setValue(result.documento_identidad)
      this.FormUsuario.controls['correo'].setValue(result.email)
      this.FormUsuario.controls['telefono'].setValue(result.telefono_usuario)
      this.FormUsuario.controls['direccion'].setValue(result.direccion_usuario)
    });
  }
  actualizar(){
    if (this.FormUsuario.invalid) {
      this.toars.error('Completa todos los campos')
    }
    let data={
      "username": this.FormUsuario.controls['nombreUsuario'].value,
      "password": this.usuario.password,
      "name": this.FormUsuario.controls['nombre'].value,
      "last_name": this.FormUsuario.controls['apellidos'].value,
      "email": this.FormUsuario.controls['correo'].value,
      "direccion": this.FormUsuario.controls['direccion'].value,
      "telefono": this.FormUsuario.controls['telefono'].value,
      "tipo_documento": this.FormUsuario.controls['tipo'].value,
      "documento": this.FormUsuario.controls['NumDoc'].value,
      "rol":this.usuario.rol
  }
  this.usuarioService.editar(data, this.usuario.id).subscribe(result=>{
    this.toars.success('Informacion actualiza', 'ShoesCompany')
  })
  }
}
