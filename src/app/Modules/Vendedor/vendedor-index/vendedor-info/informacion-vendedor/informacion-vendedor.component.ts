import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/auth.service';
import { LocalesService } from 'src/app/Core/locales.service';

@Component({
  selector: 'app-informacion-vendedor',
  templateUrl: './informacion-vendedor.component.html',
  styleUrls: ['./informacion-vendedor.component.css']
})
export class InformacionVendedorComponent implements OnInit {
  usuario:any;
  local:any;
  formLocal:FormGroup

  constructor(private auth: AuthService, private service:LocalesService,
              private toars:ToastrService
    ){
    this.formLocal=new FormGroup({
      nombre:new FormControl(null,[Validators.required]),
      nit:new FormControl(null,[Validators.required]),
      direccion:new FormControl(null,[Validators.required]),
      telefono:new FormControl(null,[Validators.required]),
      correo:new FormControl(null,[Validators.required]),
      imagen:new FormControl(null,[Validators.required])
    })
  }

  ngOnInit(): void {
    this.octenerinfo();
   
  }
  GuardarCambios(){
    let data={
      "nombre_local":this.formLocal.controls['nombre'].value,
      "direccion_local":this.formLocal.controls['direccion'].value,
      "telefono_local": this.formLocal.controls['telefono'].value,
      "nit_local": this.formLocal.controls['nit'].value,
      "image": this.formLocal.controls['imagen'].value,
      "usuario_id": this.usuario.id
  }
  this.service.save(data,this.local.id).subscribe(result=>{
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
    if (loc) {
      this.local=JSON.parse(loc)
    }
    this.service.getById(this.local.id).subscribe(result=>{
      this.formLocal.controls['nombre'].setValue(result.nombre_local); 
      this.formLocal.controls['nit'].setValue(result.nit_local); 
      this.formLocal.controls['direccion'].setValue(result.direccion_local); 
      this.formLocal.controls['telefono'].setValue(result.telefono_local); 
      this.formLocal.controls['correo'].setValue(this.usuario.email); 
      localStorage.removeItem('local')
      localStorage.setItem('local', JSON.stringify(result))
    })
  }
}
