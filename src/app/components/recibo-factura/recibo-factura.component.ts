import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '@app/models/payment';
import { PaymentService } from '@app/services/payment.service';

@Component({
  selector: 'app-recibo-factura',
  templateUrl: './recibo-factura.component.html',
  styleUrls: ['./recibo-factura.component.css']
})
export class ReciboFacturaComponent implements OnInit {

  title = "Factura";
  pago: Payment;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.getPagoById(id));
  }

  getPagoById(id:number){debugger
    this.paymentService.getPagosbyUser(id).subscribe(
      res=>{
        this.pago = res;
        console.log(this.pago);
      }
    )
  }

}
