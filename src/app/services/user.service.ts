import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Eviroment
import { environment } from '../../environments/environment';
//Models
import { User } from '../models/user'

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usuario: User;

  constructor(private http: HttpClient) { }


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

  guardarLocalStorage(token: string,){
    localStorage.setItem('token', JSON.stringify(token));
  }



  getAll(): Observable<any> {

    const url = `${baseUrl}/usuarios`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, usuarios: User}) => resp.usuarios)
      )
  }


  getUser(id:number): Observable<any> {

    const url = `${baseUrl}/usuarios/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, usuario: User}) => resp.usuario)
        );
  }


  update(usuario:any, id: number) {
    const url = `${baseUrl}/usuarios/${usuario._id}`;
    return this.http.put(url, usuario, this.headers);
  }

  deleteById(id:number): Observable<any> {
    const url = `${baseUrl}/usuarios/delete/${id}`;
    return this.http.delete(url, this.headers)
  }

  profileUser(){
    const url = `${baseUrl}/usuario`;
    return this.http.get(url, this.headers)
  }

  getRecientes(): Observable<any> {
    const url = `${baseUrl}/usuarios/recientes`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, usuarios: User}) => resp.usuarios)
      )
  }
}
