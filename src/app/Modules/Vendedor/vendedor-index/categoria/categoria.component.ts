import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from 'src/app/Core/categorias.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  bandera=false
  listCategorias:any[]=[]
  formCategoria:FormGroup
  id=0

  constructor(private service:CategoriasService){
    this.formCategoria=new FormGroup({
      nombre: new FormControl(null,[Validators.required])
    });
  }

  ngOnInit(): void {
    this.getList();
  }
  getList(){
    this.service.getAll().subscribe(result=>{
      this.listCategorias=result
    });
  }
  editar(id:any){
    this.bandera=true;
    this.id=id
    this.service.getById(id).subscribe(result=>{
      this.formCategoria.controls['nombre'].setValue(result.descripcion)
    });
  }
  actualizar(){}

  eliminar(id:any){
    this.service.delete(id).subscribe(result=>{
      alert("categoria eliminada")
      this.getList();
    })
  }

  guardar(){
    if (this.formCategoria.invalid) {
      alert("completa los datos")
    }
    let data={
      "descripcion": this.formCategoria.controls['nombre'].value,
      "local_usuario_id": 1
    }
    if (this.id!=0) {
      this.service.save(data, this.id).subscribe(result=>{
        alert("categoria editada")
        this.cerrar();
        this.getList();
      });
    } else {
      this.service.save(data, this.id).subscribe(result=>{
        alert("categoria guardada")
        this.cerrar();
        this.getList();
      }); 
    }

  }
  cerrar(){
    let boton=document.getElementById('cerrar')
    boton?.click()
  }
}
