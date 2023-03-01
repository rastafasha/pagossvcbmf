import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentDetailsComponent } from './payments/payment-details/payment-details.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';

//modulos
import { SharedModule } from '@app/shared/shared.module';
import { ComponentsModule } from '@app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//helpers
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { JwtInterceptor } from '@app/helpers/jwt.interceptor';

import { UserHistorialpagosComponent } from './user-historialpagos/user-historialpagos.component';
import { HelpComponent } from './help/help.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
// import { UserPagarComponent } from './user-pagar/user-pagar.component';

// Import Angular plugin.
import { NgxPayPalModule } from 'ngx-paypal';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularFileUploaderModule } from "angular-file-uploader";
//Qr
import { QRCodeModule } from 'angular2-qrcode';
// paginacion
import { NgxPaginationModule } from 'ngx-pagination';

import { UserProfileComponent } from './user-profile/user-profile.component';
// import { ConfModule } from './conf/conf.module';
import {PagesComponent} from './pages.component';
import { DirectorioIndexComponent } from './directorio/directorio-index/directorio-index.component';
import { PipesModule } from '@app/pipes/pipes.module';
import { ConfModule } from './conf/conf.module';
import { DirectorioEditComponent } from './directorio/directorio-edit/directorio-edit.component';
import { DirectorioViewComponent } from './directorio/directorio-view/directorio-view.component';
import { ProductosPageComponent } from './productos/productos-page/productos-page.component';
import { PlanesPageComponent } from './planes/planes-page/planes-page.component';
import { ProductoComponent } from './productos/producto/producto.component';
import { PlanComponent } from './planes/plan/plan.component';
import { PaymentEditComponent } from './payments/payment-edit/payment-edit.component';
import { ReportarPagoComponent } from './payments/reportar-pago/reportar-pago.component';
import { AuthInterceptor } from '@app/services/auth.interceptor';
import { DirectorioViewPublicComponent } from './directorio/directorio-view-public/directorio-view-public.component';

import { httpInterceptorProviders } from '../http-interceptors/index';

@NgModule({
  declarations: [
    DashboardComponent,

    ProfileComponent,
    UserDetailsComponent,
    UsersComponent,
    UserHistorialpagosComponent,
    HelpComponent,
    ContactComponent,
    DashboardUserComponent,
    DashboardAdminComponent,
    UserProfileComponent,
    PagesComponent,
    DirectorioIndexComponent,
    DirectorioEditComponent,
    DirectorioViewComponent,
    PlanesPageComponent,
    ProductosPageComponent,
    ProductoComponent,
    PlanComponent,
    PaymentDetailsComponent,
    PaymentsComponent,
    PaymentEditComponent,
    ReportarPagoComponent,
    DirectorioViewPublicComponent



  ],
  exports: [
    DashboardComponent,
    PaymentDetailsComponent,
    PaymentsComponent,
    ProfileComponent,
    UserDetailsComponent,
    UsersComponent,
    UserHistorialpagosComponent,
    HelpComponent,
    ContactComponent,
    DashboardUserComponent,
    DashboardAdminComponent,
    UserProfileComponent,
    DirectorioIndexComponent,
    DirectorioEditComponent,
    DirectorioViewComponent,
    PlanesPageComponent,
    ProductosPageComponent,
    ProductoComponent,
    PlanComponent,
    ReportarPagoComponent,
    DirectorioViewPublicComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule,
    QRCodeModule,
    PipesModule,
    ConfModule,
    NgxPayPalModule,
    AngularFileUploaderModule

  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
export class PagesModule { }
