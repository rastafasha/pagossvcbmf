import { NgModule, isDevMode } from '@angular/core';
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
import { AngularFileUploaderModule } from "angular-file-uploader";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@environments/environment';

import {MdToastModule} from 'md-toast/toast';
import {ToastrModule} from 'ngx-toastr';
import { httpInterceptorProviders } from './http-interceptors/index';
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
    NgxSpinnerModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    // AngularFileUploaderModule
    // CKEditorModule,
    ToastrModule.forRoot(), // ToastrModule added


  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
