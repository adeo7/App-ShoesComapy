import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/auth.service';
import { CarritoDetallesService } from 'src/app/Core/carrito-detalles.service';
import { CarritoPedidoService } from 'src/app/Core/carrito-pedido.service';
import { ProductoService } from 'src/app/Core/producto.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  total:number=0
  cantidad=0
  descuento=0
  subtotal=0
  Usuario:any
  carrito:any[]=[]
  ListProductos:any[]=[]
  data:any
  usuario:any
  
  // funcionamiento de los botones
  myNumber: number = 1;

  constructor(private service: CarritoDetallesService,
              private authService: AuthService,
              private toarts :ToastrService,
              private pedido:CarritoPedidoService
    ){
    }

  ngOnInit(): void {
    let usu=localStorage.getItem('usuario')
    if (usu) {
      this.usuario=JSON.parse(usu)
    }
    this.getCarrito()
    
  }
  increment(id:any) {
    this.service.getById(id).subscribe(result=>{
      this.data=result;
      this.data.cantidad+1;
    },
    error=>{
      console.log("error al traer: "+error)
    });
    this.service.editar(this.data,id).subscribe(result=>{
      this.data={}
      this.getCarrito();
    },
    error=>{
      console.log(error);
    });
  }

  decrement(id:any) {
    this.service.getById(id).subscribe(result=>{
      this.data=result;
      if (this.data.cantidad>1) {
        this.data.cantidad-1
      }
    },
    error=>{
      console.log("error al traer: "+error)
    });
    console.log(this.data)
    this.service.editar(this.data,id).subscribe(result=>{
      this.getCarrito();
    },
    error=>{
      console.log(error);
    });
  
  }
  getCarrito(){
    let producto:any
    this.service.getAll().subscribe(result=>{
    producto=result
    this.ListProductos=Object.values(producto)
    this.ListProductos.forEach(element => {
      this.carrito.push(element.id)
     
    });
    this.calcular();
    },
    error=>{
      console.log(error)
    })
  }
  calcular(){
    this.ListProductos.forEach(element => {
      let precio:number=parseInt(element.total)
      let can:number=parseInt(element.cantidad)
      this.subtotal=this.subtotal+precio
      this.total=this.subtotal-this.descuento
      this.cantidad=this.cantidad+can
    });
  }
  eliminar(id:any){
    this.service.delete(id).subscribe(result=>{
      this.getCarrito();
      this.toarts.error("Eliminaste el articulo",'ShoesCompany')
    },
    error=>{
      console.log(error)
    });
  }

  pedir(){
    let data={
        "codigo": "123",
        "usuario_id": this.usuario.id,
        "carrito_id": this.carrito
    }
    this.pedido.save(data).subscribe(result=>{
      this.toarts.success('Pedido realizado correctamente', 'ShoesCompay')
    })
  }
}
