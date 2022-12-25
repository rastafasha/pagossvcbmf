import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from '@app/models/plan';
import {MessageService} from '@app/services/message.service';
@Component({
  selector: 'app-planes-page',
  templateUrl: './planes-page.component.html',
  styleUrls: ['./planes-page.component.css']
})
export class PlanesPageComponent implements OnInit {

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
