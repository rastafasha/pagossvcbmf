import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ComponentsModule } from '@app/components/components.module';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AppRoutingModule } from '@app/app-routing.module';
import {SearchComponent} from './search/search.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SearchComponent,
    ModalComponent
  ],
  exports: [
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SearchComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
  ]
})
export class SharedModule { }
