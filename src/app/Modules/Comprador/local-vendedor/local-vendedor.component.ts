import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/Core/auth.service';
import { GetLocalesService } from 'src/app/Core/get-locales.service';
import { GetProductosService } from 'src/app/Core/get-productos.service';
import { LocalesService } from 'src/app/Core/locales.service';
import { ProductoService } from 'src/app/Core/producto.service';

@Component({
  selector: 'app-local-vendedor',
  templateUrl: './local-vendedor.component.html',
  styleUrls: ['./local-vendedor.component.css']
})
export class LocalVendedorComponent implements OnInit {
  listaProductos: any[] = []
  local: any;
  id: any;
  constructor(private service: LocalesService,
    private productoService: ProductoService,
    private activateRoute: ActivatedRoute,
    private getlocales:GetLocalesService,
    private auth: AuthService,
    private getProductos:GetProductosService
  ) {
    this.id = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    let productos: any[] = []
    let productoslocal: any[] = []
    if (this.auth.isLoggedIn()) {
      forkJoin([
        this.service.getById(this.id),
        this.productoService.getAll()
      ]).subscribe(
        ([Result, productosResult]) => {
          this.local = Result
          productos = productosResult;
          for (let i = 0; i < productos.length; i++) {
            if (productos[i].local == this.local.nombre) {
              productoslocal.push(productos[i])
            }
            this.listaProductos = productoslocal;
          }
        },
        error => {
          // Manejo de errores si es necesario
          console.error(error);
        }
      );
    } else {
      forkJoin([
        this.getlocales.getById(this.id),
        this.getProductos.getAll()
      ]).subscribe(
        ([Result, productosResult]) => {
          this.local = Result
          productos = productosResult;
          for (let i = 0; i < productos.length; i++) {
            if (productos[i].local == this.local.nombre) {
              productoslocal.push(productos[i])
            }
            this.listaProductos = productoslocal;
          }
        },
        error => {
          // Manejo de errores si es necesario
          console.error(error);
        }
      );
    }
  }
}
