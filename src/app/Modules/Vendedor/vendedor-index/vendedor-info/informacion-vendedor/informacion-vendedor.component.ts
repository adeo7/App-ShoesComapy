import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
              private toars:ToastrService,private router:Router
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
    const formData = new FormData();
      formData.append("image", this.formLocal.controls['imagen'].value);
      formData.append("nombre_local", this.formLocal.controls['nombre'].value);
      formData.append("direccion_local", this.formLocal.controls['direccion'].value);
      formData.append("telefono_local", this.formLocal.controls['telefono'].value);
      formData.append("nit_local", this.formLocal.controls['nit'].value);
     // formData.append("usuario_id", this.usuario.id);

  this.service.save(formData,this.local.id).subscribe(result=>{
    this.toars.success('Informacion guardada exitosamente', 'ShoesCompay')
    this.octenerinfo();
    window.location.reload()
  },
  error=>{
    this.toars.error('Error al guardar')
    console.log(error)
  })

  }
  onFileSelected(event: any) {
    this.formLocal.controls['imagen'].setValue(event.target.files[0])
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
      this.formLocal.controls['nombre'].setValue(result.nombre); 
      this.formLocal.controls['nit'].setValue(result.nit); 
      this.formLocal.controls['direccion'].setValue(result.direccion); 
      this.formLocal.controls['telefono'].setValue(result.telefono); 
      this.formLocal.controls['correo'].setValue(this.usuario.email); 
      localStorage.removeItem('local')
      localStorage.setItem('local', JSON.stringify(result))
    })
  }
}
