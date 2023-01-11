import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment, PagoHecho } from '@app/models/payment';
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
  pagoHecho: PagoHecho;

  @Input() amount;
  @Input() items;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.getPagoById(id));
    console.log(this.pagoHecho);
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
