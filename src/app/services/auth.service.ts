import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';

import {tap, map, catchError} from 'rxjs/operators';

// User interface
export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = environment.apiUrl;

  userProfile: User;

  constructor(private http: HttpClient) {}


  guardarLocalStorage( user:any, access_token: any){
    // localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('auth_token', JSON.stringify(access_token));
  }

  // User registration
  register(user: User): Observable<any> {
    return this.http.post(`${this.serverUrl}/register`, user)
    .pipe(map(user => {
      localStorage.setItem('auth_token', JSON.stringify(user));

      return user;
    }));
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post(`${this.serverUrl}/login`, user)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.user, resp.access_token);

      })
    )

  }
  // Access user profile
  profileUser(): Observable<any> {
    // return this.http.get(`${this.serverUrl}/user/user-profile/`);

    const url = `${this.serverUrl}/user/user-profile/`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, userProfile: User}) => resp.userProfile)
      )
  }
}
