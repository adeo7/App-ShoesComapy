import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { CategoriasService } from 'src/app/Core/categorias.service';
import { ImagenProductoService } from 'src/app/Core/imagen-producto.service';
import { ProductoService } from 'src/app/Core/producto.service';
import { TallasService } from 'src/app/Core/tallas.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  listPrdocutos: any[] = []
  listCategorias: any[] = []
  listTallas: any[] = []
  id=0
  bandera=false
  public FrmProducto: FormGroup
  constructor(private service: ProductoService,
    private serviceFoto: ImagenProductoService,
    private serviceCategorias: CategoriasService,
    private serviceTallas: TallasService,
    private activaRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.id = this.activaRoute.snapshot.params['id'];
    this.FrmProducto = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      precio: new FormControl(null, [Validators.required]),
      marca: new FormControl(null, [Validators.required]),
      genero: new FormControl(null, [Validators.required]),
      categoria: new FormControl(null, [Validators.required]),
      talla: new FormControl(null, [Validators.required]),
      disponibles: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      imgProducto: new FormControl(null, [Validators.required])
      // falta para almacenar la imagen
    });
  }

  ngOnInit(): void {
    this.getlistas();
    if (this.id!=0) {
      this.service.getById(this.id).subscribe(result=>{
        this.bandera=true
        this.FrmProducto.controls['nombre'].setValue(result.nombre),
        this.FrmProducto.controls['descripcion'].setValue(result.descripcion),
        this.FrmProducto.controls['marca'].setValue(result.marca),
        this.FrmProducto.controls['precio'].setValue(result.precio),
        this.FrmProducto.controls['color'].setValue(result.color),
        this.FrmProducto.controls['genero'].setValue(result.genero),
        this.FrmProducto.controls['disponibles'].setValue(result.disponible),
        this.FrmProducto.controls['categoria'].setValue(result.categoria),
        this.FrmProducto.controls['talla'].setValue(result.talla)
      });
    } else {
      
    }
  }
  getlistas(){
    this.serviceCategorias.getAll().subscribe(result=>{
      this.listCategorias=result
    });
    this.serviceTallas.getAll().subscribe(result=>{
      this.listTallas=result
    });
  }

 


  getlist() {
    let productos: any[] = []
    let fotos: any[] = []
    forkJoin([
      this.service.getAll(),
      this.serviceFoto.getAll(),
      this.serviceCategorias.getAll(),
      this.serviceTallas.getAll()
    ]).subscribe(
      ([Result, fotoResult, resultCate, resultTallas]) => {
        productos = Result
        fotos = fotoResult;
        this.listCategorias = resultCate;
        this.listTallas = resultTallas;
        this.listPrdocutos = productos
      },
      error => {
        // Manejo de errores si es necesario
        console.error(error);
      }
    );
  }
  guardar(){
    if (this.FrmProducto.invalid) {
      console.log("falto")
    }
    let data={
      "nombre": this.FrmProducto.controls['nombre'].value,
      "descripcion":this.FrmProducto.controls['descripcion'].value,
      "marca":this.FrmProducto.controls['marca'].value,
      "precio":this.FrmProducto.controls['precio'].value,
      "color": this.FrmProducto.controls['color'].value,
      "genero": this.FrmProducto.controls['genero'].value,
      "disponible": this.FrmProducto.controls['disponibles'].value,
      "categoria_id": this.FrmProducto.controls['categoria'].value,
      "talla_id": this.FrmProducto.controls['talla'].value,
      "local_usuario_id": 1
    }
    this.service.save(data).subscribe(result=>{
      this.toastr.success("producto guardado exitosamnete", "ShoesCompany")
    },
    error=>{
      this.toastr.error("Error al guardar el producto", "ShoesCompany")
      console.log(error)
    });
  
  }
  editar(){
    if (this.FrmProducto.invalid) {
      console.log("falto")
    }
    let data={
      "nombre": this.FrmProducto.controls['nombre'].value,
      "descripcion":this.FrmProducto.controls['descripcion'].value,
      "marca":this.FrmProducto.controls['marca'].value,
      "precio":this.FrmProducto.controls['precio'].value,
      "color": this.FrmProducto.controls['color'].value,
      "genero": this.FrmProducto.controls['genero'].value,
      "disponible": this.FrmProducto.controls['disponibles'].value,
      "categoria_id": this.FrmProducto.controls['categoria'].value,
      "talla_id": this.FrmProducto.controls['talla'].value,
      "local_usuario_id": 1
    }
    this.service.editar(this.id, data).subscribe(result=>{
      this.toastr.success("producto editado exitosamnete", "ShoesCompany")
      this.bandera=false
      this.router.navigateByUrl('vendedor/productos')
    });

  }
}
