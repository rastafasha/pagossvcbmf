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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private linktTheme = document.querySelector('.dark');// se comunica el id pulsado



  public user: User;
  error: string;

  urlTheme:any;
  classExist;
  id:number;
  roleid:number;


  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private accountService: AccountService,
    private roleService: RoleService,
    private storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

    ) {
      this.user = this.accountService.user;


    }

  ngOnInit(): void {



    // this.iniciarDarkMode();
    this.getUser();

  }



  // ngDoCheck(): void {
  //   this.user = this.userService.user;

  // }



  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    if(!this.user || !this.user.id || this.user.id == null || this.user.id == undefined){
      this.router.navigateByUrl('/login');

    }
      this.id = this.user.id;


    //verifica que se hallan logueado
    if(!this.user || !this.user.id){
      this.router.navigateByUrl('/login');

    }


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
