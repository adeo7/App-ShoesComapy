import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  public formRecuperar: FormGroup;

  constructor(private toars:ToastrService,
               private router: Router
    ) {
    this.formRecuperar = new FormGroup({
      email: new FormControl(null, [Validators.required])
    });
    }
    ngOnInit(): void {

    }
    recuperar(): void {
      let credentials = {
        "email": this.formRecuperar.controls['email'].value
      }
      if (this.formRecuperar.invalid) {
        this.toars.error('Por favor completa el campos','ShoesComapny')
        return
      }

      }
    }

  /* constructor(private toasr:ToastrService){
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
  } */

