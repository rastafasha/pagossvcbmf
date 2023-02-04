import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import { RequestResetComponent } from '@app/components/request-reset/request-reset.component';

const routes: Routes = [

    { path: 'registro', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'request-password-reset', component: RequestResetComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
