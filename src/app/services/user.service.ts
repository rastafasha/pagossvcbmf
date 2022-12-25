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
import { RoleService } from './role.service';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;
  public identity: User;
  // public role: Role;
  error:string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private roleService:RoleService
    ) {
    this.user;
  }


  get token():string{
    return localStorage.getItem('token') || '';
  }

  get role(): 'SUPERADMIN' | 'ADMIN' | 'MEMBER' | 'GUEST' {
    return this.user.role!;
  }


  get headers(){
    return{
      headers: {
        'token': this.token

      }
    }

  }

  guardarLocalStorage( user:any, access_token: any){
    // localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', JSON.stringify(access_token.original.access_token));
  }

  getUserLocalStorage(): void {
    return this.user = JSON.parse(localStorage.getItem('user'));
  }


  getAll(): Observable<any> {

    const url = `${baseUrl}/users`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, users: User}) => resp.users)
      )
  }

  getUserById(id:number): Observable<any> {

    const url = `${baseUrl}/user/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, user: User}) => resp.user)
        );

  }

  getRecientes(): Observable<any> {
    const url = `${baseUrl}/usuarios/recientes/`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, users: User}) => resp.users)
      )
  }





  update(id: number) {
    const url = `${baseUrl}/user/update/${id}`;
    return this.http.put(url,  this.headers);
  }

  deleteById(user:User): Observable<any> {
    const url = `${baseUrl}/user/destroy/${user}`;
    return this.http.delete(url, this.headers)
  }

  //soft deletes

  indexdelete(): Observable<any> {
    const url = `${baseUrl}/users/delete`;
    return this.http.get(url, this.headers)
  }
  userDeleteShow(id:number): Observable<any> {
    const url = `${baseUrl}/user/delete/show/${id}`;
    return this.http.get(url, this.headers)
  }
  userDeleteRestore(id:number): Observable<any> {
    const url = `${baseUrl}/user/delete/restore/${id}`;
    return this.http.put(url, this.headers)
  }
  userDeleteforce(id:number): Observable<any> {
    const url = `${baseUrl}/user/destroy/force/${id}`;
    return this.http.delete(url, this.headers)
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }






}
