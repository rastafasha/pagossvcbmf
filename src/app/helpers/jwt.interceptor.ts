import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

//import { environment } from '@environments/environment';
//import { LoginService } from '../_services/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        
        const token = localStorage.getItem('jwt-token');
        if (token) {
            request = request.clone({
              headers: request.headers.set('Authorization', `${token}`)
            });
        }

        return next.handle(request);
    }
}