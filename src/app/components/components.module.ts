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
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ReciboFacturaComponent } from './recibo-factura/recibo-factura.component';
import { PlanesyproductosComponent } from './planesyproductos/planesyproductos.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { NgxPayPalModule } from 'ngx-paypal';
import {PipesModule} from '../pipes/pipes.module';
import {ModalComponent} from './modal/modal.component';

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
    UsuariosRecientesComponent,
    CartComponent,
    CartItemComponent,
    ReciboFacturaComponent,
    PlanesyproductosComponent,
    NotificacionesComponent,
    ProductItemComponent,
    ModalComponent
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
    UsuariosRecientesComponent,
    CartComponent,
    CartItemComponent,
    ReciboFacturaComponent,
    PlanesyproductosComponent,
    NotificacionesComponent,
    ProductItemComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule,
    HttpClientModule,
    NgxPayPalModule,
    PipesModule
    // CKEditorModule
  ]
})
export class ComponentsModule { }
