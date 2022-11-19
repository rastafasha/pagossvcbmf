import { Injectable } from '@angular/core';
import { TokenService } from '@app/services/token.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private userState = new BehaviorSubject<boolean>(this.token.isLoggedIn()!);

  userAuthState = this.userState.asObservable();

  constructor(public token: TokenService) {}

  setAuthState(value: boolean) {
    this.userState.next(value);
  }
}
