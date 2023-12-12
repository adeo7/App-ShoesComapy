import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-informacion-vendedor',
  templateUrl: './informacion-vendedor.component.html',
  styleUrls: ['./informacion-vendedor.component.css']
})
export class InformacionVendedorComponent implements OnInit {
  usuario:any;

  constructor(private auth: AuthService){}

  ngOnInit(): void {
    let usu=localStorage.getItem('usuario')
    if (usu) {
      this.usuario=JSON.parse(usu);
    }
  }
}
