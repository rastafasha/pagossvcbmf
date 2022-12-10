import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { Role } from '@app/models/role';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public user: User;
  public role: Role;

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

  getAll(): Observable<any> {
    const url = `${baseUrl}/roles`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, roles: Role}) => resp.roles)
      )
  }

  getRolbyId(id: number): Observable<any> {
    const url = `${baseUrl}/role/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, role: Role}) => resp.role)
        );
  }

  updateRole(id: number) {
    const url = `${baseUrl}/roles/update/${id}`;
    return this.http.put(url, this.headers);
  }

}
