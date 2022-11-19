import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { PaymentDetailsComponent } from './pages/payment-details/payment-details.component';
import { UserHistorialpagosComponent } from './pages/user-historialpagos/user-historialpagos.component';
import { HelpComponent } from './pages/help/help.component';
import { ContactComponent } from './pages/contact/contact.component';
import { UserPagarComponent } from './pages/user-pagar/user-pagar.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestResetComponent } from './components/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/response-reset/response-reset.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';




const routes: Routes = [
  { path: '', component: DashboardComponent, data:{title:'Dashboard'} },
  //auth
  { path: 'login', component: LoginComponent, data:{title:'Login'} },
  { path: 'registro', component: RegisterComponent, data:{title:'registro'} },
  { path: 'request-password-reset', component: RequestResetComponent, data:{title:'registro'} },
  { path: 'response-password-reset', component: ResponseResetComponent, data:{title:'registro'} },
  { path: 'profile/:id', component: ProfileComponent, data:{title:'Perfil'} },
  //admin
  { path: 'payments', component: PaymentsComponent, data:{title:'Pagos'} },
  { path: 'payment-detail/:id', component: PaymentDetailsComponent, data:{title:'Detalle Pago'} },
  //user
  { path: 'users', component: UsersComponent, data:{title:'Usuarios'} },
  { path: 'user/:id', component: UserProfileComponent, data:{title:'Detalle Usuario'} },
  { path: 'user/edit/:id', component: UserDetailsComponent, data:{title:'Editar Usuario'} },
  { path: 'historial-pagos', component: UserHistorialpagosComponent, data:{title:'Historial Pagos'} },
  { path: 'realizar-pago', component: UserPagarComponent, data:{title:'Relizar Pago'} },
  //otros
  { path: 'help', component: HelpComponent, data:{title:'Ayuda'} },
  { path: 'contact', component: ContactComponent, data:{title:'Contacto'} },

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component:  DashboardComponent },


]



@NgModule({

  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
