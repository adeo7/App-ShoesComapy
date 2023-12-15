import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/auth.service';
import { GetUsuariosService } from 'src/app/Core/get-usuarios.service';
import { UsuarioService } from 'src/app/Core/usuario.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  @NgModule({
    imports: [
      NgxIntlTelInputModule
    ]
  })
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  documentTypes = ['CC', 'TI', 'CE'];
  public registroForm: FormGroup;

  constructor(private serviceUsuario: GetUsuariosService, private router: Router, private authService: AuthService,
    private toars: ToastrService
  ) {
    this.registroForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      documentType: new FormControl(null, [Validators.required]),
      documentNumber: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      terms: new FormControl(false, [Validators.pattern('true')])
    });
  }


  ngOnInit() {

  }
  registro(): void {
    if (this.registroForm.invalid) {
      this.toars.error('Por favor completa los campos', 'ShoesCompany')
      Object.values(this.registroForm.controls).forEach(control => {
        control.markAsTouched();
      })
      return
    } else {
      let pas = this.registroForm.controls['password'].value
      let confiPas = this.registroForm.controls['confirmPassword'].value
      if (pas != confiPas) {
        this.toars.error('Por favor verifica la contraseña', 'ShoesCompany')
      } else {
        let phoneNumber = this.registroForm.controls['phone'].value;
        let formattedPhoneNumber = phoneNumber.internationalNumber;
        console.log(formattedPhoneNumber)
        let data = {
          "password": this.registroForm.controls['password'].value,
          "username": this.registroForm.controls['username'].value,
          "name": this.registroForm.controls['firstName'].value,
          "last_name": this.registroForm.controls['lastName'].value,
          "email": this.registroForm.controls['email'].value,
          "direccion": this.registroForm.controls['address'].value,
          "telefono": formattedPhoneNumber,
          "tipo_documento": this.registroForm.controls['documentType'].value,
          "documento": this.registroForm.controls['documentNumber'].value,
          //"roles_id": 1
        }
        this.serviceUsuario.save(data).subscribe(result => {
          this.toars.success('Bienvenido', 'ShoesCompany')
          let credentials = {
            "username": this.registroForm.controls['username'].value,
            "password": this.registroForm.controls['password'].value
          }
          this.authService.login(credentials).subscribe(result => {
            console.log(this.authService.getUserData())
            this.router.navigateByUrl('#')
          },
            error => {
              console.log(error)
            });
        },
          error => {
            console.log(error)
          })
      }
    }
  }
  mostrarContrasenaConfirmar = false;
  toggleMostrarContrasenaConfirmar() {
    this.mostrarContrasenaConfirmar = !this.mostrarContrasenaConfirmar;
  }
  mostrarContrasena = false;
  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  getErrorMessage(controlName: string): string {
    const control = this.registroForm.get(controlName);
    if (control?.hasError('email')) {
      return 'Por favor, ingresa un correo electrónico válido.';
    } else if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    } else if (control?.hasError('pattern')) {
      return this.getPatternErrorMessage(controlName);
    } else if (control?.hasError('minlength')) {
      return this.getMinLengthErrorMessage(controlName);
    }
    return '';
  }
  private getPatternErrorMessage(controlName: string): string {
    switch (controlName) {
      case 'username':
        return 'Este campo no es válido para el nombre de usuario.';
      // Agrega más casos según sea necesario para otros campos
      default:
        return 'Este campo no es válido.';
    }
  }

  private getMinLengthErrorMessage(controlName: string): string {
    const control = this.registroForm.get(controlName);

    switch (controlName) {
      case 'username':
        return `El nombre de usuario debe tener al menos ${control?.getError('minlength').requiredLength} caracteres.`;
      case 'firstName':
        return `El correo electrónico debe tener al menos ${control?.getError('minlength').requiredLength} caracteres.`;
      // Agrega más casos según sea necesario para otros campos
      default:
        return `Este campo debe tener al menos ${control?.getError('minlength').requiredLength} caracteres.`;
    }
  }



  // checkPasswords(group: FormGroup) {
  //   let pass = group.controls.password.value;
  //   let confirmPass = group.controls.confirmPassword.value;

  //   return pass === confirmPass ? null : { notSame: true }
  // }

  // onSubmit() {
  //   console.log(this.registroForm.value);
  // }
}