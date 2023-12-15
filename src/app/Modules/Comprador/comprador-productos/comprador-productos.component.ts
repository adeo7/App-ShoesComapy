import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/Core/auth.service';
import { GetProductosService } from 'src/app/Core/get-productos.service';
import { ImagenProductoService } from 'src/app/Core/imagen-producto.service';
import { ProductoService } from 'src/app/Core/producto.service';

@Component({
  selector: 'app-comprador-productos',
  templateUrl: './comprador-productos.component.html',
  styleUrls: ['./comprador-productos.component.css']
})
export class CompradorProductosComponent implements OnInit {
  listProductos: any[] = []
  constructor(private service: ProductoService,
    private productoSin: GetProductosService,
    private serviceFoto: ImagenProductoService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  this.ver();
  }


  getList() {
    if (this.auth.isLoggedIn()) {
      this.service.getAll().subscribe(result=>{
        this.listProductos=result;
      });
    } else {
      this.productoSin.getAll().subscribe(result=>{
        this.listProductos=result;
      }); 
    }

  }
  verProducto(id: any) {
    this.router.navigateByUrl('producto/' + id)
  }
  ver() {
    let listFotoProductos: any[] = [];
    let listFotosP: any[] = [];
    let productos: any[] = [];

    forkJoin([
      this.service.getAll(),
      this.serviceFoto.getAll()
    ]).subscribe(
      ([productosResult, fotosResult]) => {
        console.log(productosResult)
        productos = productosResult;
        listFotoProductos = fotosResult;
        console.log(fotosResult)
        for (let i = 0; i < productos.length; i++) {
          for (let j = 0; j < listFotoProductos.length; j++) {
            if (productos[i].id == listFotoProductos[j].producto) {
              listFotosP.push(listFotoProductos[j].image);
            }
          }
          let producto = {
            "id": productos[i].id,
            "nombre": productos[i].nombre,
            "precio": productos[i].precio,
            "color": productos[i].color,
            "marca": productos[i].marca,
            "genero": productos[i].genero,
            "disponibles": productos[i].disponible,
            "fotos": listFotosP
          };
          this.listProductos.push(producto);
          listFotosP = []; // Reinicia la lista para el próximo producto
        }
        console.log(this.listProductos)
      },
      error => {
        // Manejo de errores si es necesario
        console.error(error);
      }
    );
    console.log("los productos sin auto: "+this.listProductos)
  }
}
