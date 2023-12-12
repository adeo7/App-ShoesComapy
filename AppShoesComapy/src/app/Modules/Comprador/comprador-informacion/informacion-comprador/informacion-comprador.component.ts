import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Core/usuario.service';

@Component({
  selector: 'app-informacion-comprador',
  templateUrl: './informacion-comprador.component.html',
  styleUrls: ['./informacion-comprador.component.css']
})
export class InformacionCompradorComponent implements OnInit {
  usuario:any;
  
  constructor(private usuarioService:UsuarioService
    ){}

  ngOnInit(): void {
    let usu=localStorage.getItem('usuario')
    if (usu) {
      this.usuario=JSON.parse(usu)
    }
  }
}
