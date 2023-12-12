import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';
import { LocalesService } from 'src/app/Core/locales.service';

@Component({
  selector: 'app-nav-comprador',
  templateUrl: './nav-comprador.component.html',
  styleUrls: ['./nav-comprador.component.css']
})
export class NavCompradorComponent {
  Usuario:any
  inicio:boolean=false
  
  constructor(private service: LocalesService,
    private router: Router,
    private auth :AuthService

  ) { 
   
   this.inicio=auth.isLoggedIn();
  }

  ngOnInit(): void {
    this.getList();
    let Usu=localStorage.getItem('usuario')
    if (Usu) {
      this.Usuario=JSON.parse(Usu); 
    }
  }

  getList() {
    this.Usuario=this.auth.getUserData()
  }
  cerrar(){
    alert("cerrar seccion?")
    this.auth.logout();
    this.router.navigateByUrl('');
  }

}
