import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/auth.service';
import { CarritoDetallesService } from 'src/app/Core/carrito-detalles.service';
import { GetProductosService } from 'src/app/Core/get-productos.service';
import { ProductoService } from 'src/app/Core/producto.service';

@Component({
  selector: 'producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoCompradorComponent implements OnInit{
  carrito:any[]=[]
  producto:any;
  Usuario:any
  id:any;
  disponible:number=0
  cantidad=0
  precio=0
  constructor(private service:ProductoService,
              private activeRouter:ActivatedRoute,
              private getProducto: GetProductosService,
              private carritoDservice:CarritoDetallesService,
              private aunthService: AuthService,
              private toars: ToastrService
    ){
      this.id=activeRouter.snapshot.params['id'];
  }
  ngOnInit(): void {
   this.getList(); 
  }

  getList(){
    let usu=localStorage.getItem('usuario')
    if (usu) {
      this.Usuario=JSON.parse(usu);
    }
    if (this.aunthService.isLoggedIn()) {
      this.service.getById(this.id).subscribe(result=>{
        this.producto=result
        this.disponible=result.disponible
      },
      error=>{
        console.log(error) 
      }
      );
    } else {
      this.getProducto.getById(this.id).subscribe(result=>{
        this.producto=result
        this.disponible=result.disponible
      },
      error=>{
        console.log(error) 
      }
      );
    }

  }
  //aca se guarda el producto del carrito
  agregarCarrito(){
    let data={
      "cantidad": this.cantidad,
      "precio": this.producto.precio,
      "impuesto": "0",
      "total": this.cantidad*this.producto.precio,
      "producto_id": this.id,
      "usuario_id": this.Usuario.id,
      "cupones_id": null
  }
    this.carritoDservice.save(data).subscribe(result=>{
      this.toars.success('Agregaste '+this.producto.nombre+' al carrito','ShoesCompany' )
    },
    error=>{
      console.log(error)
    });
  }

}
