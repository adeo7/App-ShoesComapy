import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  frmPqr: FormGroup;
  constructor(private service: PqrsService,
    private serviceRespuesta: PqrsRespuestaService,
    private serviceTipo: PqrstipoService
  ) {
    this.frmPqr = new FormGroup({
      numero_radicado: new FormControl(null, [Validators.required]),
      tipo_peticion: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      fecha_respuesta: new FormControl(null, [Validators.required]),
      local_peticion: new FormControl(null, [Validators.required]),
      nit_local: new FormControl(null, [Validators.required]),
      nombre_usuario: new FormControl(null, [Validators.required]),
      apellidos_usuario: new FormControl(null, [Validators.required]),
      direccion_usuario: new FormControl(null, [Validators.required]),
      tipo_documento: new FormControl(null, [Validators.required]),
      documento: new FormControl(null, [Validators.required]),
      telefono_usuario: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getlist();
  }
  getlist() {
    forkJoin([
      this.service.getAll(),
      this.serviceRespuesta.getAll(),
      this.serviceTipo.getAll(),
    ]).subscribe(
      ([result, respuestaResult, tipoResult]) => {
        this.listPqrs = result;
        this.listPqrsRespuesta = respuestaResult;
        this.listPqrstipo = tipoResult;
        console.log("pqr: "+result)
      },
      error => {
        console.error(error);
      });
  }
}
