import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
//Eviroment
import { environment } from '../../environments/environment';
//Models
import { User } from '@app/models/user';

import { RegisterForm } from '../auth/interfaces/register-form.interface';



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  serverUrl = environment.apiUrl;
  isLoggedIn = false;

  public error = null;

  public user;
  public usuario: User;

  private iss ={
    login: 'http://localhost:8000/api/login',
    register: 'http://localhost:8000/api/register',
  }

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
      this.user;
    }

    get token():string{
      return localStorage.getItem('token') || '';
    }

    get headers(){
      return{
        headers: {
          'token': this.token
        }
      }
    }


    guardarLocalStorage(token: string){
      localStorage.setItem('token', JSON.stringify(token));
    }

    get(){
      return localStorage.getItem('token');
    }

    remove(){
      localStorage.removeItem('token');
    }


    payload(token){
      const payload = token.split('.')[1];
      this.decode(payload);
    }

    decode(payload){
      return JSON.parse(atob(payload));
    }


  login(username: string, password: string): Observable<User> {

    return this.http.post<any>(`${this.serverUrl}/login`, {username: username, password: password}, { withCredentials: false })
      .pipe(map(user => {
        // localStorage.setItem('token', user.token);
        localStorage.setItem('token', JSON.stringify(user));

        this.router.navigateByUrl('/admin');
        return user;
      }));
  }



  crearUsuario(formData: RegisterForm){
    return this.http.post(`${this.serverUrl}/register`, formData)
    .pipe(map(user => {
      localStorage.setItem('token', JSON.stringify(user));

      return user;
    }));
  }


  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
