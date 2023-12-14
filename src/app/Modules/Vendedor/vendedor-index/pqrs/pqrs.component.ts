import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { PqrsRespuestaService } from 'src/app/Core/pqrs-respuesta.service';
import { PqrsService } from 'src/app/Core/pqrs.service';
import { PqrstipoService } from 'src/app/Core/pqrstipo.service';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.css']
})
export class PQRSComponent implements OnInit {

  listPqrs: any[] = []
  listPqrsRespuesta: any[] = []
  listPqrstipo: any[] = []
  pqr:any
  usuario:any
  local:any
  frmPqr: FormGroup;
  constructor(private service: PqrsService,
    private serviceRespuesta: PqrsRespuestaService,
    private toars:ToastrService
  ) {
    this.frmPqr = new FormGroup({
      descripcion: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getlist();
    this.getlist();
    this.obtenerinfo();
  }
  getlist() {
    forkJoin([
      this.service.getAll(),
      this.serviceRespuesta.getAll(),
    ]).subscribe(
      ([result, respuestaResult]) => {
        this.listPqrs = result;
        this.listPqrsRespuesta = respuestaResult;
      },
      error => {
        console.error(error);
      });
  }

  ver(id:any){
    this.service.getById(id).subscribe(result=>{
      this.pqr=result
    })
  }
  obtenerinfo(){
    let usu=localStorage.getItem('usuario')
    let lo=localStorage.getItem('local')
    if (usu) {
      this.usuario=JSON.parse(usu)
    }
    if (lo) {
      this.local=JSON.parse(lo)
    }
  }

  responder(){
    if (this.frmPqr.invalid) {
      this.toars.error('Tienes que escribir una respuesta', 'ShoesCompany')
      return
    }
   let  data={
      "numero_radicado": this.pqr.numero_radicado,
      "tipo_peticion": this.pqr.tipo_peticion,
      "descripcion": this.frmPqr.controls['descripcion'].value,
      "local_id":this.local.id,
      "usuario_id":this.usuario.id,
      "pqr_id":this.pqr.id
  }  
  this.serviceRespuesta.save(data).subscribe(result=>{
    this.toars.success('Respuesta enviada','ShoesCompany')
  },
  error=>{
    this.toars.error('Error al enviar')
  });
  }
}
