import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';

const routes: Routes = [

    { path: 'registro', component: SignupComponent },
    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
