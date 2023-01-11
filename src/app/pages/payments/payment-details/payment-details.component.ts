import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '@app/models/payment';
import { PaymentService } from '@app/services/payment.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  title = "Detalle Pago";
  pago: Payment;
  error: string;
  private payments = 'assets/dataSimulada/pago.json';

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.getPagoById(id));
  }
  getUser(id:number){
    this.paymentService.getPagosbyUser(id).subscribe(
      res =>{
        this.pago = res;
        error => this.error = error
        console.log(this.pago);
      }
    );
  }

  getPagoById(id:number){
    this.paymentService.getPagoById(id).subscribe(
      res=>{
        this.pago = res;
        console.log(this.pago);
      }
    )
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
