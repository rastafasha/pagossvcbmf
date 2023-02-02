import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Currencies } from '@app/models/currencies';
import { CurrenciesService } from '@app/services/currencies.service';
import {MessageService} from '@app/services/message.service';
import { Plan } from '@app/models/plan';
import{PlanesService} from '@app/services/planes.service';

@Component({
  selector: 'app-planes-page',
  templateUrl: './planes-page.component.html',
  styleUrls: ['./planes-page.component.css']
})
export class PlanesPageComponent implements OnInit {

  plan: Plan;
  planes: Plan;
  error:string;
  currenciesAll: Currencies;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private planesService: PlanesService,
    private currenciesService: CurrenciesService,

    ) { }

  ngOnInit(): void {
    this.getPlanes();
  }


  getPlanes(): void {
    // return this.planesService.carga_info();
    this.planesService.getPlanes().subscribe(
      res =>{
        this.planes = res;
        error => this.error = error
        console.log(this.planes);
      }
    );
  }

  getCurrencies(): void {
    this.currenciesService.getCurrencies().subscribe(
      res =>{
        this.currenciesAll = res;
        error => this.error = error
        console.log(this.currenciesAll);
      }
    );
  }

}
