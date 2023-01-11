import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from '@app/services/auth-state.service';
import { AuthService } from '@app/services/auth.service';
import { TokenService } from '@app/services/token.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  errors:any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService
  ) {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }
  ngOnInit() {}
  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe(
      (result) => {
        this.responseHandler(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.authState.setAuthState(true);
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      }
    );
  }
  // Handle response
  responseHandler(data:any) {
    this.token.handleData(data.access_token);
  }




}
