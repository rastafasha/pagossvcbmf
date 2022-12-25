import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { User } from '@app/models/user';
import { Directorio } from '@app/models/directorio';
import { UserService } from '@app/services/user.service';
import { Location } from '@angular/common';
import { PaymentService } from '@app/services/payment.service';
import{Payment} from '@app/models/payment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  title = "Detalles de la cuenta";
  user: User;
  error: string;
  directories: Directorio;
  payments: Payment;
  id:number;
  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.closeMenu();
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
        this.user = res[0];
        error => this.error = error
        console.log(this.user);
      }
    );

  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
