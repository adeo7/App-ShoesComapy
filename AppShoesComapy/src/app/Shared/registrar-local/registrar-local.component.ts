import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetLocalesService } from 'src/app/Core/get-locales.service';

@Component({
  selector: 'app-registrar-local',
  templateUrl: './registrar-local.component.html',
  styleUrls: ['./registrar-local.component.css']
})
export class RegistrarLocalComponent {

formLocal:FormGroup
usuario:any
id=0

constructor(private toars:ToastrService, private service:GetLocalesService){
  this.formLocal=new FormGroup({
    nombre:new FormControl(null,[Validators.required]),
    nit:new FormControl(null,[Validators.required]),
    direccion:new FormControl(null,[Validators.required]),
    telefono:new FormControl(null,[Validators.required]),
    correo:new FormControl(null,[Validators.required]),
    imagen:new FormControl(null,[Validators.required])
  })
}

registrar(){
  if (this.formLocal.invalid) {
    this.toars.warning('por favor completa la informacion')
  }
  let data={
    "nombre_local":this.formLocal.controls['nombre'].value,
    "direccion_local":this.formLocal.controls['direccion'].value,
    "telefono_local": this.formLocal.controls['telefono'].value,
    "nit_local": this.formLocal.controls['nit'].value,
    "image": this.formLocal.controls['imagen'].value,
    "usuario_id": this.usuario.id
}
this.service.save(data,this.id).subscribe(result=>{
  this.toars.success('Informacion guardada exitosamente', 'ShoesCompay')
  this.octenerinfo();
},
error=>{
  this.toars.error('Error al guardar')
})

}
octenerinfo(){
  let usu=localStorage.getItem('usuario')
  let loc=localStorage.getItem('local')
  if (usu) {
    this.usuario=JSON.parse(usu);
  } 
}

}
