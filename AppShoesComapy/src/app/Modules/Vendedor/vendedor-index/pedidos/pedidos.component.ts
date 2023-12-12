import { Component, OnInit } from '@angular/core';
import { CarritoDetallesService } from 'src/app/Core/carrito-detalles.service';
import { CarritoPedidoService } from 'src/app/Core/carrito-pedido.service';
import { UsuarioService } from 'src/app/Core/usuario.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit{

  listPedidos:any[]=[]
  pedido:any
  productosPedido:any[]=[]
  clientePedido:any
  total=0
  

  constructor(private service:CarritoPedidoService,
              private serviceUsuario:UsuarioService,
              private serviceDetalle:CarritoDetallesService,
              private serviceUsuarios:UsuarioService        
    ){

  }
  ngOnInit(): void {
    this.getlist();
  
  }

  getlist(){
    this.service.getAll().subscribe(result=>{
     this.listPedidos=result
     }); 
   
  }

  verPedido(id:any){
    let productos:any[]=[]
    this.service.getById(id).subscribe(result=>{
      this.pedido=result
      this.productPedidos(this.pedido.carrito_id)
      this.getClientePedido(this.pedido.usuario_id)
      
    });
  }
  productPedidos(pedidos:any[]){
    pedidos.forEach(element => {
      this.serviceDetalle.getById(element).subscribe(result=>{
        let num:number=parseInt(result.total)
        this.total=this.total+num
        this.productosPedido.push(result);
      });
      
    });

  }
  getClientePedido(id:any){
    this.serviceUsuario.getById(id).subscribe(result=>{
      this.clientePedido=result
      console.log(this.clientePedido)
    })
  }
}
