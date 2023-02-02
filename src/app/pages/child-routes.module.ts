import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestResetComponent } from '@app/components/request-reset/request-reset.component';
import { ResponseResetComponent } from '@app/components/response-reset/response-reset.component';

import { AdminGuard } from '../guards/admin.guard';

//pages
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';

import { PaymentDetailsComponent } from './payments/payment-details/payment-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserHistorialpagosComponent } from './user-historialpagos/user-historialpagos.component';
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
import { RolesViewComponent } from './conf/roles/roles-view/roles-view.component';
import { PlanesPageComponent } from './planes/planes-page/planes-page.component';
import { ProductosPageComponent } from './productos/productos-page/productos-page.component';
import { ProductoComponent } from './productos/producto/producto.component';
import { PlanComponent } from './planes/plan/plan.component';
import { PaymentEditComponent } from './payments/payment-edit/payment-edit.component';
import { ReportarPagoComponent } from './payments/reportar-pago/reportar-pago.component';



const childRoutes: Routes = [

    { path: '',  component: DashboardComponent, data:{title:'Dashboard'} },
    //auth
    { path: 'request-password-reset', component: RequestResetComponent, data:{title:'registro'} },
    { path: 'response-password-reset', component: ResponseResetComponent, data:{title:'registro'} },
    { path: 'profile/:id',  component: ProfileComponent, data:{title:'Perfil'} },
    //admin
    { path: 'payments',   component: PaymentsComponent, data:{title:'Pagos'} },
    { path: 'payment-detail/:id', component: PaymentDetailsComponent, data:{title:'Detalle Pago'} },
    { path: 'payment/edit/:id', component: PaymentEditComponent, data:{title:'Editar Pago'} },

    //user
    { path: 'users', component: UsersComponent, data:{title:'Usuarios'} },
    { path: 'user/:id', component: UserProfileComponent, data:{title:'Detalle Usuario'} },
    { path: 'user/edit/:id', component: UserProfileComponent, data:{title:'Editar Usuario'} },
    // { path: 'user/edit/:id', component: UserDetailsComponent, data:{title:'Editar Usuario'} },
    { path: 'historial-pagos', component: UserHistorialpagosComponent, data:{title:'Historial Pagos'} },
    { path: 'realizar-pago', component: ReportarPagoComponent, data:{title:'Relizar Pago'} },
    { path: 'search/:searchItem', component: UsersComponent, data:{title:'Buscar'} },
    { path: 'factura/:id', component: ReciboFacturaComponent, data:{title:'Buscar'} },

    //directorio
    { path: 'directorio',  component: DirectorioIndexComponent, data:{title:'Directorio'} },
    { path: 'directorio/create', component: DirectorioEditComponent, data:{title:'Directorio Crear'} },
    { path: 'directorio/edit/:id', component: DirectorioEditComponent, data:{title:'Directorio Editar'} },
    { path: 'directorio/member/edit/:user_id', component: DirectorioEditComponent, data:{title:'Directorio Editar'} },
    { path: 'directorio/view/:id', component: DirectorioViewComponent, data:{title:'Directorio Editar'} },

    //configuraciones
    { path: 'configuraciones',  component: ConfiguracionesComponent, data:{title:'Configuraciones'} },

    { path: 'rolesconf', component: RolesViewComponent, data:{title:'Planes'} },

    { path: 'planes', component: PlanesIndexComponent, data:{title:'Planes'} },
    { path: 'plan/:id', component: PlanesIndexComponent, data:{title:'Plan'} },
    { path: 'planes/create', component: PlanesEditComponent, data:{title:'Crear Plan'} },
    { path: 'plan/edit/:id', component: PlanesEditComponent, data:{title:'Editar Plan'} },
    { path: 'planes/all', component: PlanesPageComponent, data:{title:'Planes'} },
    { path: 'planes/plan', component: PlanComponent, data:{title:'Planes'} },

    { path: 'productos/all', component: ProductosPageComponent, data:{title:'Productos'} },
    { path: 'productos/producto', component: ProductoComponent, data:{title:'Producto'} },

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
