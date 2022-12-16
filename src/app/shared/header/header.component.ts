import { Component, OnInit, DoCheck } from '@angular/core';
//import { Router, ActivatedRoute, ParamMap } from '@angular/router';

//Services

import { AlertService } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/user';
import { Role } from '@app/models/role';
import { RoleService } from '@app/services/role.service';
import { StorageService } from '@app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private linktTheme = document.querySelector('.dark');// se comunica el id pulsado



  public user: User;
  role: Role;
  error: string;

  urlTheme:any;
  classExist;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private accountService: AccountService,
    private roleService: RoleService,
    private storageService: StorageService,
    ) {
      this.user = this.accountService.user;


    }

  ngOnInit(): void {
    this.getUser();
    this.iniciarDarkMode();


  }



  // ngDoCheck(): void {
  //   this.user = this.userService.user;
  // }


  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // return this.userService.getUserLocalStorage();
    // console.log(this.user);

    this.getRolbyId(this.user.id);

  }

  getRolbyId(id:number): void {

    this.roleService.getRolbyId(id).subscribe(
      res =>{
        this.role = res;
        error => this.error = error
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


  iniciarDarkMode(){
    let body = document.querySelector('body');
    let header = document.querySelector('header');
    let aside = document.querySelector('aside');

    let classExists = document.getElementsByClassName(
      'dark'
     ).length > 0;


    if (classExists) {
      const urlTheme = localStorage.getItem('dark');
      this.linktTheme?.setAttribute('class', urlTheme);
      body.classList.toggle('dark');
        header.classList.toggle('dark');
        aside.classList.toggle('dark');
      console.log('✅ class exists on page');
    } else {

      console.log('⛔️ class does NOT exist on page');
    }
  }



  darkmode(dark:string){
    let body = document.querySelector('body');
    let header = document.querySelector('header');
    let aside = document.querySelector('aside');

    const classExists = document.getElementsByClassName(
      'dark'
     ).length > 0;

    var dayNight = document.getElementsByClassName("dayNight");
      for (var i = 0; i<dayNight.length; i++) {
        dayNight[i].classList.toggle("active");
        body.classList.toggle('dark');
        header.classList.toggle('dark');
        aside.classList.toggle('dark');

      }
      // localStorage.setItem('dark', dark);

      if (classExists) {
        localStorage.removeItem('dark');
        console.log('✅ class exists on page, removido');
      } else {
        localStorage.setItem('dark', dark);
        console.log('⛔️ class does NOT exist on page, agregado');
      }
      // console.log('Pulsado');
  }



}
