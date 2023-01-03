import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AccountService } from './services/account.service';
import { AlertService } from './services/alert.service';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private linktTheme = document.querySelector('.dark');// se comunica el id pulsado


  public user: User;

  id:number;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private accountService: AccountService,
    private storageService: StorageService,
    private router: Router,

    ) {
      this.user = this.accountService.user;


    }
  ngOnInit(): void {
    this.iniciarDarkMode();

  }

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
      if(localStorage.getItem('dark') != null){
        const urlTheme = localStorage.getItem('dark');
        this.linktTheme?.setAttribute('class', urlTheme);
        body.classList.add('dark');
          header.classList.add('dark');
          aside.classList.add('dark');
      }
      console.log('⛔️ class does NOT exist on page');
    }
  }




}
