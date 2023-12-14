import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-vendedor-index',
  templateUrl: './vendedor-index.component.html',
  styleUrls: ['./vendedor-index.component.css']
})
export class VendedorIndexComponent implements OnInit{

  usuario:any;
  local:any

  constructor(private service: AuthService, private router: Router){}

  ngOnInit(): void {
    let usu=localStorage.getItem('usuario')
    let loc=localStorage.getItem('local')
    if (usu) {
      this.usuario=JSON.parse(usu)
    }
    if (loc) {
      this.local=JSON.parse(loc)
    }
console.log(this.local)
  }
  cerrar(){
this.service.logout();
localStorage.removeItem('local')
localStorage.removeItem('usuario')
this.router.navigateByUrl('login');
  }
}
