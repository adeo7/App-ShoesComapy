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
    let data={
      "username": "brayan",
      "name": "brayan david",
      "last_name": "mosquera medina",
      "email": "bdmosquera7@misena.edu.co",
      "direccion": "crr 23 sur",
      "telefono": "31569686",
      "tipo_documento": "cc",
      "documento": 10036512,
      "roles_id": 1
  }
  }
}
