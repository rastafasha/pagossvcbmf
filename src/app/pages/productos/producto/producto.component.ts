import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from '@app/models/plan';
import {MessageService} from '@app/services/message.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  // @Input() product: Plan;
  plan: Plan;

  constructor(
    private messageService: MessageService,
    private router: Router
    ) { }


  ngOnInit(): void {
  }

  addToCart(): void{
    console.log('sending product..')
    this.messageService.sendMessage(this.plan);
    this.router.navigateByUrl('/dashboard/realizar-pago');
  }

}
