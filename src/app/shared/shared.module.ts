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
import { MenuiconosComponent } from './menuiconos/menuiconos.component';
import { HttpClientModule } from '@angular/common/http';
import { BannerplanesComponent } from './bannerplanes/bannerplanes.component';


@NgModule({
  declarations: [
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SearchComponent,
    ModalComponent,
    MenuiconosComponent,
    BannerplanesComponent
  ],
  exports: [
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SearchComponent,
    ModalComponent,
    MenuiconosComponent,
    BannerplanesComponent

  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
