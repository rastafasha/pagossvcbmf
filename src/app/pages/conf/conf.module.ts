import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { CurrenciesIndexComponent } from './currencies/currencies-index/currencies-index.component';
import { CurrenciesEditComponent } from './currencies/currencies-edit/currencies-edit.component';
import { PlanesEditComponent } from './planes/planes-edit/planes-edit.component';
import { PlanesIndexComponent } from './planes/planes-index/planes-index.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { ComponentsModule } from '@app/components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '@app/pipes/pipes.module';
import { RolesViewComponent } from './roles/roles-view/roles-view.component';


@NgModule({
  declarations: [
    ConfiguracionesComponent,
    CurrenciesIndexComponent,
    CurrenciesEditComponent,
    PlanesEditComponent,
    PlanesIndexComponent,
    RolesViewComponent

  ],
  exports: [
    ConfiguracionesComponent,
    CurrenciesIndexComponent,
    CurrenciesEditComponent,
    PlanesEditComponent,
    PlanesIndexComponent,
    RolesViewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    NgxPaginationModule,
    PipesModule
  ]
})
export class ConfModule { }
