import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

import { map } from 'rxjs/operators';
import { Role } from '@app/models/role';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public role: Role;

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

  getAll(): Observable<any> {
    const url = `${baseUrl}/roles`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, roles: Role}) => resp.roles)
      )
  }

  get(id: string): Observable<any> {
    const url = `${baseUrl}/roles/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, rol: Role}) => resp.rol)
        );
  }

}
