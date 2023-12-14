import { Component, OnInit } from '@angular/core';
import { LocalesService } from 'src/app/Core/locales.service';
import { PqrsService } from 'src/app/Core/pqrs.service';

@Component({
  selector: 'app-pqrs-form',
  templateUrl: './pqrs-form.component.html',
  styleUrls: ['./pqrs-form.component.css']
})
export class PqrsFormComponent implements OnInit{
  listLocales:any[]=[]
  constructor(private service:PqrsService,
              private serviceLocales:LocalesService
      ){}

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.serviceLocales.getAll().subscribe(result=>{
      this.listLocales=result;
    })
  }
}
