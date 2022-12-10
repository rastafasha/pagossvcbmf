import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Payment } from '@app/models/payment';
import { PaymentService } from '@app/services/payment.service';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  title = "Pagos"

  pagos: Payment;
  error:string;
  p: number = 1;
  count: number = 8;



  constructor(
    private location: Location,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.getPagos();
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
