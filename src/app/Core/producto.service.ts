import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlBase = 'http://127.0.0.1:8000/productos/productos/';
  private httpHeader:HttpHeaders

  constructor(private Http:HttpClient) {
    this.httpHeader = new HttpHeaders();
    this.httpHeader.append('Content-Type', 'application/json');
   }
   getAll() {
    return this.Http.get<any>(this.urlBase,{ headers :this.httpHeader })
  }
  save(data:any) {
      return this.Http.post<any>(this.urlBase,data,{headers :this.httpHeader})   
  }
  editar(id:any, data:any){
    return this.Http.put<any>(this.urlBase + id+'/',data,{headers :this.httpHeader})  
  }

  getById(id:any) {
    return this.Http.get<any>(this.urlBase+id,{headers :this.httpHeader})
  }

  delete(id:number) {
    return this.Http.delete<any>(this.urlBase+id.toString(),{headers :this.httpHeader})
  }

}
