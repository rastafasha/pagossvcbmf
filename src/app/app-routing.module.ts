import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

// Modulos
import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';


const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PagesComponent },


];


// const routes: Routes = [
//   { path: '', component: DashboardComponent, data:{title:'Dashboard'} },
//   //auth
//   { path: 'login', component: LoginComponent, data:{title:'Login'} },
//   { path: 'registro', component: RegisterComponent, data:{title:'registro'} },
//   { path: 'request-password-reset', component: RequestResetComponent, data:{title:'registro'} },
//   { path: 'response-password-reset', component: ResponseResetComponent, data:{title:'registro'} },
//   { path: 'profile/:id', component: ProfileComponent, data:{title:'Perfil'} },
//   //admin
//   { path: 'payments', component: PaymentsComponent, data:{title:'Pagos'} },
//   { path: 'payment-detail/:id', component: PaymentDetailsComponent, data:{title:'Detalle Pago'} },
//   //user
//   { path: 'users', component: UsersComponent, data:{title:'Usuarios'} },
//   { path: 'user/:id', component: UserProfileComponent, data:{title:'Detalle Usuario'} },
//   { path: 'user/edit/:id', component: UserDetailsComponent, data:{title:'Editar Usuario'} },
//   { path: 'historial-pagos', component: UserHistorialpagosComponent, data:{title:'Historial Pagos'} },
//   { path: 'realizar-pago', component: UserPagarComponent, data:{title:'Relizar Pago'} },
//   { path: 'search/:searchItem', component: UsersComponent, data:{title:'Buscar'} },
//   //otros
//   { path: 'configuraciones', component: ConfiguracionesComponent, data:{title:'Ayuda'} },

//   { path: 'planes', component: PlanesIndexComponent, data:{title:'Planes'} },
//   { path: 'planes/:plan', component: PlanesIndexComponent, data:{title:'Plan'} },
//   { path: 'planes/edit/:plan', component: PlanesEditComponent, data:{title:'Editar Plan'} },
//   { path: 'currencies', component: CurrenciesIndexComponent, data:{title:'Monedas'} },
//   { path: 'currency/:currency', component: CurrenciesIndexComponent, data:{title:'Moneda'} },
//   { path: 'currency/edit/:currency', component: CurrenciesEditComponent, data:{title:'Editar Moneda'} },

//   { path: 'help', component: HelpComponent, data:{title:'Ayuda'} },
//   { path: 'contact', component: ContactComponent, data:{title:'Contacto'} },

//   { path: '', redirectTo: '', pathMatch: 'full' },
//   { path: '**', component:  DashboardComponent },


// ]



@NgModule({

  imports: [RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],

  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
