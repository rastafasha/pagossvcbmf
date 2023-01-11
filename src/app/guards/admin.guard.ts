import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AccountService } from '@app/services/account.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {

      if(this.accountService.role === 'SUPERADMIN') {
        return true;
      }else {
        this.router.navigateByUrl('/dashboard');
        return false;
      }
  }

}
