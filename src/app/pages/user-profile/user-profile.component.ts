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
  usuario: User;
  error: string;
  directorios: Directorio;
  pagos: Payment;

  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.getUser(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getpagosUser(id));
  }

  getUser(id:number){
    this.userService.getUser(id).subscribe(
      res =>{
        this.usuario = res;
        error => this.error = error
        console.log(this.usuario);
      }
    );
  }
  getpagosUser(id:number){
    this.paymentService.getPagosbyUser(id).subscribe(
      res =>{
        this.pagos = res;
        error => this.error = error
        console.log(this.pagos);
      }
    );
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
