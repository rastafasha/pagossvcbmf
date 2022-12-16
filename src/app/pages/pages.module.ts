import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
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
import { JwtInterceptor } from '@app/helpers/jwt.interceptor';
import { UserHistorialpagosComponent } from './user-historialpagos/user-historialpagos.component';
import { HelpComponent } from './help/help.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { UserPagarComponent } from './user-pagar/user-pagar.component';

// Import Angular plugin.
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
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


@NgModule({
  declarations: [
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
    UserPagarComponent,
    UserProfileComponent,
    PagesComponent,
    DirectorioIndexComponent,
    DirectorioEditComponent,
    DirectorioViewComponent

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
    UserPagarComponent,
    UserProfileComponent,
    DirectorioIndexComponent,
    DirectorioEditComponent,
    DirectorioViewComponent
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
    ConfModule

  ]
})
export class PagesModule { }
