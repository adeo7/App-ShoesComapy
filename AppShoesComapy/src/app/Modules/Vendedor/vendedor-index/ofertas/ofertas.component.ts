import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OfertasService } from 'src/app/Core/ofertas.service';
import { ProductoService } from 'src/app/Core/producto.service';
import { TallasService } from 'src/app/Core/tallas.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {
  public frmOfreta: FormGroup;
  listOfertas: any[] = [];
  listProductos: any[] = [];
  bandera = false
  id = 0
  constructor(private service: OfertasService,
    private serviceP: ProductoService
  ) {
    this.frmOfreta = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      descuento: new FormControl(null, [Validators.required]),
      fecha_inicio: new FormControl(null, [Validators.required]),
      fecha_fin: new FormControl(null, [Validators.required]),
      producto: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getlist();
  }
  getlist() {
    this.service.getAll().subscribe(result => {
      this.listOfertas = result;
    },
      error => {
        console.log(error)
      });
    this.serviceP.getAll().subscribe(result => {
      this.listProductos = result;
    },
      error => {
        console.log(error)
      });
  }
  guardar() {
    if (this.frmOfreta.invalid) {
      alert("por favor completar todos los campos")
    }
    let data = {
      "tipo": this.frmOfreta.controls['nombre'].value,
      "descuento": this.frmOfreta.controls['descuento'].value,
      "inicio_oferta": this.frmOfreta.controls['fecha_inicio'].value,
      "fin_oferta": this.frmOfreta.controls['fecha_fin'].value,
      "producto_id": this.frmOfreta.controls['producto'].value

    }
    console.log(data);

    this.service.save(data).subscribe(result => {
      alert("datos guardados")
      this.getlist();
    },
      error => {
        console.log(error)
      })
  }
  editar(id: any) {
    this.id = id
    this.bandera = true
    this.service.getById(id).subscribe(result => {
      this.frmOfreta.controls['nombre'].setValue(result.tipo_oferta)
      this.frmOfreta.controls['descuento'].setValue(result.descuento)
      this.frmOfreta.controls['fecha_inicio'].setValue(result.inicio_oferta)
      this.frmOfreta.controls['fecha_fin'].setValue(result.fin_oferta)
      this.frmOfreta.controls['producto'].setValue(result.producto_id)
      console.log("el id del producto: "+result.fin_oferta)
    })
  }
  actualizar() {
    this.bandera = false
    let data = {
      "id": this.id,
      "tipo": this.frmOfreta.controls['nombre'].value,
      "descuento": this.frmOfreta.controls['descuento'].value,
      "inicio_oferta": this.frmOfreta.controls['descuento'].value,
      "fin_oferta": this.frmOfreta.controls['descuento'].value,
      "producto_id":1
    }
    this.service.edit(data, this.id).subscribe(result => {
      alert("datos actualizados")
      this.getlist();
    },
      error => {
        console.log(error)
      })
  }
  eliminar(id: any) {
    this.service.delete(id).subscribe(result => {
      alert("oferta eliminada")
      this.getlist();
    })
  }
}
