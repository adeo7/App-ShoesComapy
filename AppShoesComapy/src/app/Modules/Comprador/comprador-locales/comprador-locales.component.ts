import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalesService } from 'src/app/Core/locales.service';

@Component({
  selector: 'app-comprador-locales',
  templateUrl: './comprador-locales.component.html',
  styleUrls: ['./comprador-locales.component.css']
})
export class CompradorLocalesComponent implements OnInit {
  listaLocales:any[]=[]
constructor(private service:LocalesService,
            private router: Router

){}

ngOnInit(): void {
 this.getList();
 
}

getList(){
  this.service.getAll().subscribe(result=>{
    this.listaLocales=result
   },
   error=>{
    console.log(error)
   }); 
}
verLocal(id:any){
this.router.navigateByUrl('/local/'+id)
}
}
