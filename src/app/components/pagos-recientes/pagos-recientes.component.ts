import { Component, OnInit } from '@angular/core';
import { Payment } from '@app/models/payment';
import { PaymentService } from '@app/services/payment.service';


@Component({
  selector: 'app-pagos-recientes',
  templateUrl: './pagos-recientes.component.html',
  styleUrls: ['./pagos-recientes.component.css']
})
export class PagosRecientesComponent implements OnInit {

  pagos: Payment;
  error:string;

  constructor(
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.getPagosRecientes();
  }

  getPagosRecientes(): void {
    this.paymentService.getRecientes().subscribe(
      res =>{
        this.pagos = res;
        error => this.error = error
        console.log(this.pagos);
      }
    );
  }

}
