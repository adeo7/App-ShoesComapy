import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { GetProductosService } from 'src/app/Core/get-productos.service';
import { ImagenProductoService } from 'src/app/Core/imagen-producto.service';
import { ProductoService } from 'src/app/Core/producto.service';


@Component({
  selector: 'app-comprador-index',
  templateUrl: './comprador-index.component.html',
  styleUrls: ['./comprador-index.component.css']
})
export class CompradorIndexComponent  {
 
}

