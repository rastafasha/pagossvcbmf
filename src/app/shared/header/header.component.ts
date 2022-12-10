import { Component, OnInit, DoCheck } from '@angular/core';
//import { Router, ActivatedRoute, ParamMap } from '@angular/router';

//Services

import { AlertService } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/user';
import { Role } from '@app/models/role';
import { RoleService } from '@app/services/role.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  public user: User;
  role: Role;
  error: string;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private accountService: AccountService,
    private roleService: RoleService,
    ) {
      this.user = this.accountService.user;
    }

  ngOnInit(): void {

    this.getUser();
  }

  // ngDoCheck(): void {
  //   this.user = this.userService.user;
  // }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // return this.userService.getUserLocalStorage();
    // console.log(this.user);

  }

  prueba(): void {
    this.alertService.info("Mensaje de Prueba","Hola! Esto es una prueba para los alerts!");
  }


  openMenu(){

    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.toggle("active");

      }
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  logout(): void {
    this.accountService.logout();
  }



}
