import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {tap, map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

//Eviroment
import { environment } from '../../environments/environment';
//Models
import { User } from '../models/user';
import { Role } from '@app/models/role';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;
  public role: Role;

  constructor(private http: HttpClient,
    private router: Router) {
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

  guardarLocalStorage(token: string, usuario: any){
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(usuario));
  }

  getUserLocalStorage(): void {
    return this.user = JSON.parse(localStorage.getItem('user'));
  }





  getAll(): Observable<any> {

    const url = `${baseUrl}/usuarios`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, users: User}) => resp.users)
      )
  }

  getRecientes(): Observable<any> {
    const url = `${baseUrl}/usuarios/recientes/`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, users: User}) => resp.users)
      )
  }




  getUser(): Observable<any> {

    const url = `${baseUrl}/user/`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, user: User}) => resp.user)
        );
  }
  getUserById(id:number): Observable<any> {

    const url = `${baseUrl}/usuarios/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, user: User}) => resp.user)
        );
  }


  update(id: number) {
    const url = `${baseUrl}/usuarios/update/${id}`;
    return this.http.put(url,  this.headers);
  }

  deleteById(id:number): Observable<any> {
    const url = `${baseUrl}/usuarios/delete/${id}`;
    return this.http.delete(url, this.headers)
  }

  profileUser(){
    const url = `${baseUrl}/usuario`;
    return this.http.get(url, this.headers)
  }


}
