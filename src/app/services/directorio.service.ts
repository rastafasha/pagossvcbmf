import { Injectable } from '@angular/core';
import { Directorio } from '../models/directorio';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DirectorioService {

  public directorio: Directorio;


  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }


  getDirectorios() {
    const url = `${baseUrl}/directorios`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, directorios: Directorio}) => resp.directorios)
      )
  }

  getDirectorio(id: number) {
    const url = `${baseUrl}/directorios/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, directorio: Directorio}) => resp.directorio)
        );
  }


  createDirectorio(directorio:any) {
    const url = `${baseUrl}/directorios`;
    return this.http.post(url, directorio, this.headers);
  }

  updateDirectorio(directorio:any, id: number) {
    const url = `${baseUrl}/directorios/${directorio._id}`;
    return this.http.put(url, directorio, this.headers);
  }

  deleteDirectorio(id: number) {
    const url = `${baseUrl}/directorios/${id}`;
    return this.http.delete(url, this.headers);
  }


}
