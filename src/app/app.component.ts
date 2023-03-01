import { Component, OnInit, DoCheck , ApplicationRef} from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AccountService } from './services/account.service';
import { AlertService } from './services/alert.service';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';
import { SwUpdate } from '@angular/service-worker';
import { first, switchMap, Observable, mapTo, timeout, catchError, of, timer } from 'rxjs';
import { PwaService } from './services/pwa.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private linktTheme = document.querySelector('.dark');// se comunica el id pulsado


  public user: User;

  id:any;
  check:boolean;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private accountService: AccountService,
    private storageService: StorageService,
    private router: Router,
    private swUpdate: SwUpdate,
    private appRef: ApplicationRef,
    private pwaService: PwaService,
    public toastr: ToastrService

    ) {
      this.user = this.accountService.user;
      if (this.swUpdate.isEnabled) {
        this.appRef.isStable.pipe(
            first(isStable => isStable === true),
            switchMap(() => this.swUpdate.available),
        ).subscribe(() => {
            this.swUpdate.activateUpdate().then(() => document.location.reload());
        });
    }

    }
  ngOnInit(): void {
    this.iniciarDarkMode();
    this.checkForUpdate();
    if(navigator.onLine) {
      // alert("You are Online")
      // this.enviarNotificacionOnline();
      this.checkForUpdate();
      this.openToast();
     }
     else {
      // alert("You are Offline")
      // this.enviarNotificacionOffline();
      this.openToastOffline();
     }
    //  this.toastr.success('hello world', 'Success!');
  }

  checkForUpdate() {
    return this.pwaService.checkForUpdate().subscribe(
      res=>{
        this.check =res;
        console.log(this.check);
        if(this.check === false){
          this.enviarNotificacionActualizacion();
        }
      }
      )

  }

  openToast(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
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
      title: 'You are Online'
    })
  }

  openToastOffline(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      // didOpen: (toast) => {
      //   toast.addEventListener('mouseenter', Swal.stopTimer)
      //   toast.addEventListener('mouseleave', Swal.resumeTimer)
      // }
    })

    Toast.fire({
      icon: 'error',
      title: 'You are Offline'
    })
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

  enviarNotificacionActualizacion(): void {
    this.alertService.success("Mensaje de Actualización","Versión App Actualizada");
  }
  enviarNotificacionOnline(): void {
    this.alertService.success("Conexon de red","Activa");
  }
  enviarNotificacionOffline(): void {
    this.alertService.error("Conexon de red","Inactiva");
  }

}
