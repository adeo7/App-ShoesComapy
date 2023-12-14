import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {
formRecuperar:FormGroup
  constructor(private toasr:ToastrService){
    this.formRecuperar=new FormGroup({
      correo: new FormControl(null,[Validators.required])
    })
  }

  recuperar(){
    if (this.formRecuperar.invalid) {
      this.toasr.warning('por favor escribe el correo')
    }
    let data={
      correo:this.formRecuperar.controls['correo']
    }
  }
}
