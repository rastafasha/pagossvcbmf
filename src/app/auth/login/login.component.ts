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

  public formSumitted = false;
  public auth2: any;

  user: User;



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
login(){debugger

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
    console.log(this.user)
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



}
