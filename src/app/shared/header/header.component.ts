import { Component, OnInit } from '@angular/core';
//import { Router, ActivatedRoute, ParamMap } from '@angular/router';

//Services

import { AlertService } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public identity: any;

  error: string;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private accountService: AccountService
    ) {
      this.identity = this.userService.usuario;
    }

  ngOnInit(): void {
    console.log(this.identity);
  }

  getUser(): void {debugger
    this.userService.profileUser().subscribe(
      res =>{
        this.identity = res;
        error => this.error = error
        console.log(this.identity);
      }
    );
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
