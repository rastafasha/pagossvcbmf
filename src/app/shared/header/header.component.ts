import { Component, OnInit, DoCheck } from '@angular/core';
//import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';

//Services

import { AlertService } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/user';
import { Role } from '@app/models/role';
import { RoleService } from '@app/services/role.service';
import { StorageService } from '@app/services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private linktTheme = document.querySelector('.dark');// se comunica el id pulsado

  userProfile!: User;

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
    public authService: AuthService

    ) {


      this.user = this.accountService.user;


    }

  ngOnInit(): void {
      this.getUser();
      // this.getUserProfile();
  }

  // ngDoCheck(): void {
  //   this.user = this.userService.user;

  // }


  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
    if(!this.user || !this.user.id || this.user.id == null || this.user.id == undefined){
      this.router.navigateByUrl('/login');

    }
      this.id = this.user.id;


    //verifica que se hallan logueado
    if(!this.user || !this.user.id){
      this.router.navigateByUrl('/login');

    }


  }

  getUserProfile(){
    // this.userService.getUserById(id).subscribe((data: any) => {
    this.authService.profileUser().subscribe((data: any) => {
      this.userProfile = data;
      console.log('userProfile',this.userProfile)
    });
  }


  prueba(): void {
    this.alertService.info("Mensaje de Prueba","Hola! Esto es una prueba para los alerts!");
    this.openToastPrueba();
  }

  openToast(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      // didOpen: (toast) => {
      //   toast.addEventListener('mouseenter', Swal.stopTimer)
      //   toast.addEventListener('mouseleave', Swal.resumeTimer)
      // }
    })

    Toast.fire({
      icon: 'success',
      title: 'Prueba desdel home'
    })
  }

  openToastPrueba(){
    const Toasttest = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      // didOpen: (toast) => {
      //   toast.addEventListener('mouseenter', Swal.stopTimer)
      //   toast.addEventListener('mouseleave', Swal.resumeTimer)
      // }
    })

    Toasttest.fire({
      icon: 'success',
      title: 'Toast de prueba'
    })
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
