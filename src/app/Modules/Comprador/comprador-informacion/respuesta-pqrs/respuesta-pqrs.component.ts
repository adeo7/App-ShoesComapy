import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { PqrsRespuestaService } from 'src/app/Core/pqrs-respuesta.service';
import { PqrsService } from 'src/app/Core/pqrs.service';
import { PqrstipoService } from 'src/app/Core/pqrstipo.service';
@Component({
  selector: 'app-respuesta-pqrs',
  templateUrl: './respuesta-pqrs.component.html',
  styleUrls: ['./respuesta-pqrs.component.css']
})
export class RespuestaPqrsComponent {

  listPqrs: any[] = []
  listPqrsRespuesta: any[] = []
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
    let pqr:any[]=[]
    forkJoin([
      this.serviceRespuesta.getAll(),
    ]).subscribe(
      ([result]) => {
       this.listPqrsRespuesta=result
       console.log(this.listPqrsRespuesta)
      },
      error => {
        console.error(error);
      });
  }

  ver(id:any){
    this.serviceRespuesta.getById(id).subscribe(result=>{
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
}