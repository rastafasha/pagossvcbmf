import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/user';

declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  email = new FormControl();
  password = new FormControl();
  remember = new FormControl();

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  loginError: string;
  error = null;

  public auth2: any;

  user: User;

  // Registro
  public formSumitted = false;
  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    email: [ '', [Validators.required, Validators.email] ],
    username: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required],

  }, {
    validators: this.passwordsIguales('password', 'password2')

  });
  // Registro



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private accountService: AccountService,
    private usuarioService: UserService,
  ) {

  }
  username: FormControl<any>;
ngOnInit(){
  this.loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', Validators.required],
    remember: [false]

  });

  this.retrieveMe(); //Recupero mi nombre de usuario
}
login(){

  this.accountService.login(this.loginForm.value).subscribe(
    resp =>{
      if(this.loginForm.get('remember').value){
        localStorage.setItem('email', this.loginForm.get('email').value);
      }else{
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/dashboard');
    },(err) => {
      Swal.fire('Error', err.error.msg, 'error');
    }
  )
  this.rememberMe();
    // console.log(this.user)
}

amIRemembered() {
  return this.remember.value == 'true';
}

retrieveMe() {
  this.remember.setValue(localStorage.getItem('remember'));
  if (this.amIRemembered()) {
    this.email.setValue(localStorage.getItem('email'));
  } else {
    this.email.setValue('');
    this.remember.setValue(false);
  }
}

rememberMe() {
  localStorage.setItem('remember', this.remember.value);
  if (this.amIRemembered()) {
    localStorage.setItem('email', this.email.value);
  } else {
    localStorage.removeItem('email');

  }
}

// Registro
crearUsuario(){
  this.formSumitted = true;
  // console.log(this.registerForm.value);

  if(this.registerForm.invalid){
    return;
  }

  //realizar el posteo del usuario
  this.accountService.crearUsuario(this.registerForm.value).subscribe(
    resp =>{
      // console.log(resp);
      this.router.navigateByUrl('/login');
    },(err) => {
      Swal.fire('Error', err.error.msg, 'error');
    }
  );

}

campoNoValido(campo: string): boolean {
  if(this.registerForm.get(campo).invalid && this.formSumitted){
    return true;
  }else{
    return false;
  }


}

aceptaTerminos(){
  return !this.registerForm.get('terminos').value && this.formSumitted;
}

passwordNoValido(){
  const pass1 = this.registerForm.get('password').value;
  const pass2 = this.registerForm.get('password2').value;

  if((pass1 !== pass2) && this.formSumitted){
    return true;
  }else{
    return false;
  }
}

passwordsIguales(pass1Name: string, pass2Name: string){
  return (formGroup: FormGroup) =>{
    const pass1Control = formGroup.get(pass1Name);
    const pass2Control = formGroup.get(pass2Name);

    if(pass1Control.value === pass2Control.value){
      pass2Control.setErrors(null)
    }else{
      pass2Control.setErrors({noEsIgual: true});
    }
  }
}
// Registro



}
