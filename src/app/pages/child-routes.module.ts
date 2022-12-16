import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestResetComponent } from '@app/components/request-reset/request-reset.component';
import { ResponseResetComponent } from '@app/components/response-reset/response-reset.component';

import { AdminGuard } from '../guards/admin.guard';

//pages
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserHistorialpagosComponent } from './user-historialpagos/user-historialpagos.component';
import { UserPagarComponent } from './user-pagar/user-pagar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';

//conf
import { ConfiguracionesComponent } from './conf/configuraciones/configuraciones.component';
import { CurrenciesEditComponent } from './conf/currencies/currencies-edit/currencies-edit.component';
import { CurrenciesIndexComponent } from './conf/currencies/currencies-index/currencies-index.component';
import { PlanesIndexComponent } from './conf/planes/planes-index/planes-index.component';
import { PlanesEditComponent } from './conf/planes/planes-edit/planes-edit.component';
import { DirectorioIndexComponent } from './directorio/directorio-index/directorio-index.component';
import { ReciboFacturaComponent } from '../components/recibo-factura/recibo-factura.component';
import { DirectorioEditComponent } from './directorio/directorio-edit/directorio-edit.component';
import { DirectorioViewComponent } from './directorio/directorio-view/directorio-view.component';


const childRoutes: Routes = [

    { path: '',  component: DashboardComponent, data:{title:'Dashboard'} },
    //auth
    { path: 'request-password-reset', component: RequestResetComponent, data:{title:'registro'} },
    { path: 'response-password-reset', component: ResponseResetComponent, data:{title:'registro'} },
    { path: 'profile/:id',  component: ProfileComponent, data:{title:'Perfil'} },
    //admin
    { path: 'payments',   component: PaymentsComponent, data:{title:'Pagos'} },
    { path: 'payment-detail/:id', component: PaymentDetailsComponent, data:{title:'Detalle Pago'} },

    //user
    { path: 'users', component: UsersComponent, data:{title:'Usuarios'} },
    { path: 'user/:id', component: UserProfileComponent, data:{title:'Detalle Usuario'} },
    { path: 'user/edit/:id', component: UserDetailsComponent, data:{title:'Editar Usuario'} },
    { path: 'historial-pagos', component: UserHistorialpagosComponent, data:{title:'Historial Pagos'} },
    { path: 'realizar-pago', component: UserPagarComponent, data:{title:'Relizar Pago'} },
    { path: 'search/:searchItem', component: UsersComponent, data:{title:'Buscar'} },
    { path: 'factura', component: ReciboFacturaComponent, data:{title:'Buscar'} },

    //directorio
    { path: 'directorio', component: DirectorioIndexComponent, data:{title:'Directorio'} },
    { path: 'directorio/create', component: DirectorioEditComponent, data:{title:'Directorio Crear'} },
    { path: 'directorio/edit/:id', component: DirectorioEditComponent, data:{title:'Directorio Editar'} },
    { path: 'directorio/view/:id', component: DirectorioViewComponent, data:{title:'Directorio Editar'} },

    //configuraciones
    { path: 'configuraciones', component: ConfiguracionesComponent, data:{title:'Configuraciones'} },

    { path: 'planes', component: PlanesIndexComponent, data:{title:'Planes'} },
    { path: 'plan/:id', component: PlanesIndexComponent, data:{title:'Plan'} },
    { path: 'planes/create', component: PlanesEditComponent, data:{title:'Crear Plan'} },
    { path: 'plan/edit/:id', component: PlanesEditComponent, data:{title:'Editar Plan'} },

    { path: 'currencies', component: CurrenciesIndexComponent, data:{title:'Monedas'} },
    { path: 'currency/:id', component: CurrenciesIndexComponent, data:{title:'Moneda'} },
    { path: 'currencies/create', component: CurrenciesEditComponent, data:{title:'Crear Moneda'} },
    { path: 'currency/edit/:id', component: CurrenciesEditComponent, data:{title:'Editar Moneda'} },

    { path: 'help', component: HelpComponent, data:{title:'Ayuda'} },
    { path: 'contact', component: ContactComponent, data:{title:'Contacto'} },

    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: '**', component:  DashboardComponent },





]

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoute),
    RouterModule.forChild(childRoutes),
  ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }
