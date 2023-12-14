import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';
import { GetLocalesService } from 'src/app/Core/get-locales.service';
import { LocalesService } from 'src/app/Core/locales.service';

@Component({
  selector: 'app-comprador-locales',
  templateUrl: './comprador-locales.component.html',
  styleUrls: ['./comprador-locales.component.css']
})
export class CompradorLocalesComponent implements OnInit {
  listaLocales:any[]=[]
constructor(private service:LocalesService,
            private router: Router,
            private auth:AuthService,
            private getLocales:GetLocalesService

){}

ngOnInit(): void {
 this.getList();
 
}

getList(){
  // this.getLocales.getAll().subscribe(result=>{
  //   this.listaLocales=result
  //   console.log(this.listaLocales)
  //  },
  //  error=>{
  //   console.log(error)
  //  }); 
  if (this.auth.isLoggedIn()) {
    this.service.getAll().subscribe(result=>{
      this.listaLocales=result
     },
     error=>{
      console.log(error)
     });  
  } else {
    this.getLocales.getAll().subscribe(result=>{
      this.listaLocales=result
     },
     error=>{
      console.log(error)
     }); 
  }
}

verLocal(id:any){
this.router.navigateByUrl('/local/'+id)
}
}
