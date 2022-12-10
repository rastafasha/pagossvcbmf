import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ReactiveFormsModule } from '@angular/forms';



//modules
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';


// paginacion
import { NgxPaginationModule } from 'ngx-pagination';

// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { NgxPayPalModule } from 'ngx-paypal';
import { AuthModule } from './auth/auth.module';
import { ConfModule } from './pages/conf/conf.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    ComponentsModule,
    NgxPaginationModule,
    NgxPayPalModule,
    AuthModule,
    ConfModule
    // CKEditorModule,

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
