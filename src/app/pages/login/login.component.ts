import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

//Interfaces
import { ILoginForm } from '@app/pages/login/_interfaces/iloginform'
//Services
import { AccountService } from '../../services/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements ILoginForm, OnInit {

  username = new FormControl();
  password = new FormControl();
  remember = new FormControl();

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {errorTitle: '', errorDesc: ''};
  loginError: string;


  constructor(
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.retrieveMe(); //Recupero mi nombre de usuario

  }


  login(): void {
    this.submitted = true;
    this.accountService.login(this.username.value, this.password.value).subscribe((data) => {
       if (this.accountService.isLoggedIn) {

          this.router.navigateByUrl('/admin');
        } else {
          this.loginError = 'Username or password is incorrect.';
        }
      },
      error => this.error = error
    );

    this.rememberMe();
  }


  amIRemembered() {
    return this.remember.value == 'true';
  }

  retrieveMe() {
    this.remember.setValue(localStorage.getItem('remember'));
    if (this.amIRemembered()) {
      this.username.setValue(localStorage.getItem('username'));
    } else {
      this.username.setValue('');
      this.remember.setValue(false);
    }
  }

  rememberMe() {
    localStorage.setItem('remember', this.remember.value);
    if (this.amIRemembered()) {
      localStorage.setItem('username', this.username.value);
    } else {
      localStorage.removeItem('username');

    }
  }


}
