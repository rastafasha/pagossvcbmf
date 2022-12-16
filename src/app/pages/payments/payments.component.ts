import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Payment } from '@app/models/payment';
import { PaymentService } from '@app/services/payment.service';
import { UserService } from '@app/services/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {


  title = "Pagos"

  pagos: any;
  error:string;
  p: number = 1;
  count: number = 8;

  public user;




  constructor(
    private location: Location,
    private paymentService: PaymentService,
    private userService: UserService,
    private http: HttpClient
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.getPagos();
    // this.getPagos_list();
  }

  //carga usos desde la app
  getPagos_list(){
    this.paymentService.carga_info().subscribe(
      res=>{
        this.pagos = res;
        console.log(res)
      }
    )
  }



  getPagos(): void {
    this.paymentService.getAll().subscribe(
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

  openModal(id, event){
    var verPaypalpay = document.getElementsByClassName("vibiblepayp");
      for (var i = 0; i<verPaypalpay.length; i++) {
        verPaypalpay[i].classList.add("vibiblepaypblok");

      }

      this.paymentService.get(id).subscribe
  }


}
