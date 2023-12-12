import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
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
    private activateRoute: ActivatedRoute
  ) {
    this.id = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    let productos: any[] = []
    let productoslocal: any[] = []
    forkJoin([
      this.service.getById(this.id),
      this.productoService.getAll()
    ]).subscribe(
      ([Result, productosResult]) => {
        this.local = Result
        productos = productosResult;
        for (let i = 0; i < productos.length; i++) {
          if (productos[i].local == this.local.nombre_local) {
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
