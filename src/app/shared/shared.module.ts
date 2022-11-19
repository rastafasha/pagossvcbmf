import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ComponentsModule } from '@app/components/components.module';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AppRoutingModule } from '@app/app-routing.module';



@NgModule({
  declarations: [
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    BreadcrumbsComponent
  ],
  exports: [
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule
  ]
})
export class SharedModule { }
