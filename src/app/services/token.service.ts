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
  handleData(token: any) {
    localStorage.setItem('auth_token', JSON.stringify(token));
  }
  getToken() {
    return localStorage.getItem('auth_token');
  }
  // Verify the token
  isValidToken() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1
          ? true
          : false;
      }
    } else {
      return false;
    }
  }
  payload(token: any) {
    const jwtPayload = token.split('.')[1];
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
