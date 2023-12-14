import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-comprador-info',
  templateUrl: './comprador-info.component.html',
  styleUrls: ['./comprador-info.component.css']
})
export class CompradorInfoComponent implements OnInit{
  Usuario:any
  constructor(private auth: AuthService, private router:Router){}

  ngOnInit(): void {
    let usu=localStorage.getItem('usuario')
    if (usu) {
      this.Usuario=JSON.parse(usu)
    }
  }
  cerrar(){
    this.auth.logout()
    this.router.navigateByUrl('')
  }
}
