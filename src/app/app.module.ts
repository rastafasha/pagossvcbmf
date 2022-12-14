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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";

import { AuthModule } from './auth/auth.module';
import { ConfModule } from './pages/conf/conf.module';
import { PipesModule } from './pipes/pipes.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
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
    ConfModule,
    PipesModule,
    NgbModule,
    NgxSpinnerModule
    // CKEditorModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
