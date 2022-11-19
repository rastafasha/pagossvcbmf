import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '@app/models/payment';
import { PaymentService } from '@app/services/payment.service';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  title = "Detalle Pago";
  pago: Payment;
  error: string;
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.getUser(id));
  }
  getUser(id:number){
    this.paymentService.get(id).subscribe(
      res =>{
        this.pago = res;
        error => this.error = error
        console.log(this.pago);
      }
    );
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
