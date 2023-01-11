import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from '@app/models/plan';
import {MessageService} from '@app/services/message.service';
@Component({
  selector: 'app-productos-page',
  templateUrl: './productos-page.component.html',
  styleUrls: ['./productos-page.component.css']
})
export class ProductosPageComponent implements OnInit {

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
  }

}
