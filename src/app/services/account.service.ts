import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {tap, map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { CargarUsuario } from '../auth/interfaces/cargar-usuarios.interface';

//Eviroment
import { environment } from '../../environments/environment';
//Models
import { User } from '@app/models/user';

import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { Role } from '@app/models/role';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  serverUrl = environment.apiUrl;
  isLoggedIn = false;

  public error = null;

  public usuario: User;
  public user;




  constructor(
    private http: HttpClient,
    private router: Router
    ) {
      this.user;
    }

    get token():string{
      return localStorage.getItem('auth_token') || '';
    }

    get role(): 'SUPERADMIN' | 'ADMIN' | 'MEMBER' | 'GUEST' {
      return this.user.role!;
    }



    get headers(){
      return{
        headers: {
          'auth_token': this.token
        }
      }
    }

    getToken(){
      const token = localStorage.getItem('auth_token');

      // // tslint:disable-next-line: triple-equals
      // if (token && token != 'undefined'){
      //   this.token = token;
      // }else{
      //   this.token = null;
      // }
      return this.token;
   }


    guardarLocalStorage( user:any, access_token: any){
      // localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('auth_token', access_token.original.access_token);
    }





  login(formData: LoginForm){

    // return this.http.post<any>(`${this.serverUrl}/login`, {email: email, password: password}, { withCredentials: false })


    return this.http.post(`${this.serverUrl}/login`, formData)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.user, resp.access_token);

      })
    )

  }




  crearUsuario(formData: RegisterForm){
    return this.http.post(`${this.serverUrl}/register`, formData)
    .pipe(map(user => {
      localStorage.setItem('auth_token', JSON.stringify(user));

      return user;
    }));
  }
  logoutserver(){

    const url = `${this.serverUrl}/logout`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean}) => resp)
      );
  }

  getUsuario(id:number): Observable<any> {

    const url = `${this.serverUrl}/user/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, user: User}) => resp.user)
        );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
    this.logoutserver();
    // this.cookieService.delete('<your-cookie-name>', '/', 'localhost', false, 'Lax');
  }


   validarToken(): Observable<boolean>{

    // return this.http.get(`${this.serverUrl}/permisos`, {
    return this.http.post(`${this.serverUrl}/refresh`, {
      headers: {
        'auth_token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const {
          role_id,
          username,
          email,
          first_name,
          last_name,
           is_active,
           image,
            created_at,
            role,
            member,
              directorios,
              pagos,
          } = resp.user;

        this.user = new User();

        this.guardarLocalStorage(resp.access_token, resp.user);
        this.router.navigateByUrl('/dashboard');
        return true;
      }),
      catchError(error => of(false))
    );
  }


}
