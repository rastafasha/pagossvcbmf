import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { LogoutComponent } from './logout/logout.component';
import { RouterModule } from '@angular/router';
import { FormUserComponent } from './form-user/form-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
//Qr
import { QRCodeModule } from 'angular2-qrcode';
// Import Angular plugin.
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DolarTodayComponent } from './dolar-today/dolar-today.component';
import { RegisterComponent } from './register/register.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResponseResetComponent } from './response-reset/response-reset.component';
import { PagosRecientesComponent } from './pagos-recientes/pagos-recientes.component';
import { UsuariosRecientesComponent } from './usuarios-recientes/usuarios-recientes.component';

@NgModule({
  declarations: [
    AlertComponent,
    ConfirmComponent,
    LogoutComponent,
    FormUserComponent,
    DolarTodayComponent,
    RegisterComponent,
    RequestResetComponent,
    ResponseResetComponent,
    PagosRecientesComponent,
    UsuariosRecientesComponent
  ],
  exports: [
    AlertComponent,
    ConfirmComponent,
    LogoutComponent,
    FormUserComponent,
    DolarTodayComponent,
    RegisterComponent,
    RequestResetComponent,
    ResponseResetComponent,
    PagosRecientesComponent,
    UsuariosRecientesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule,
    HttpClientModule,
    // CKEditorModule
  ]
})
export class ComponentsModule { }
