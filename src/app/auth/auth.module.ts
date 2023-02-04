import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import {ComponentsModule} from'../components/components.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SignupComponent,
    SigninComponent,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule
  ]
})
export class AuthModule { }
