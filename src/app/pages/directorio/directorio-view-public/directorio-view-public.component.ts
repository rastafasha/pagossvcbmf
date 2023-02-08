import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { User } from '@app/models/user';
import { Directorio } from '@app/models/directorio';
import { UserService } from '@app/services/user.service';
import { Location } from '@angular/common';
import { PaymentService } from '@app/services/payment.service';
import{Payment} from '@app/models/payment';
import Swal from 'sweetalert2';
import { AlertService } from '@app/services/alert.service';
import { DirectorioService } from '@app/services/directorio.service';

@Component({
  selector: 'app-directorio-view-public',
  templateUrl: './directorio-view-public.component.html',
  styleUrls: ['./directorio-view-public.component.css']
})
export class DirectorioViewPublicComponent implements OnInit {


  title = "Detalles del directorio";
  user: User;
  userprofile: User;
  error: string;
  directories: Directorio;
  directory: Directorio;
  payments: Payment;
  id:number;

  rolesSelected:number;


  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private alertService: AlertService,
    private directorioService: DirectorioService,

  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.closeMenu();
    this.activatedRoute.params.subscribe( ({id}) => this.getDirectory(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getUserRemoto(id));

  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // return this.userService.getUserLocalStorage();
    // console.log(this.user);


  }

  getUserRemoto(id:number){
    this.userService.getUserById(+id).subscribe(
      res =>{
        this.userprofile = res[0];
        error => this.error = error
        console.log(this.userprofile);
      }
    );
    // id = this.userprofile.id;


  }

  getDirectory(id:number): void {
    // id = this.directory.user_id;

    this.directorioService.getDirectorio(id).subscribe(
      res =>{
        this.directory = res;
        error => this.error = error;
        console.log(this.directory);
      }
    );
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
