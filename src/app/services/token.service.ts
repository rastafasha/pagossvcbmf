import { Injectable } from '@angular/core';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  serverUrl = environment.apiUrl;

  private issuer = {
    login: `${this.serverUrl}/login`,
    register: `${this.serverUrl}/register`,
  };
  constructor() {}
  handleData(access_token: any) {
    // localStorage.setItem('auth_token', JSON.stringify(token));
    localStorage.setItem('auth_token', access_token.original.access_token);
  }
  getToken() {
    return localStorage.getItem('auth_token');
  }
  // Verify the token
  isValidToken() {
    const access_token = this.getToken();
    if (access_token) {
      const payload = this.payload(access_token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1
          ? true
          : false;
      }
    } else {
      return false;
    }
  }
  payload(access_token: any) {
    const jwtPayload = access_token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }
  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
  }

}
