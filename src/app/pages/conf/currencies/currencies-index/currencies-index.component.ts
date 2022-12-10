import { Component, OnInit } from '@angular/core';

//Services
import { CurrenciesService } from '@app/services/currencies.service';
import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { Currencies } from '@app/models/currencies';
import { User } from '@app/models/user';

@Component({
  selector: 'app-currencies-index',
  templateUrl: './currencies-index.component.html',
  styleUrls: ['./currencies-index.component.css']
})
export class CurrenciesIndexComponent implements OnInit {

  title = "Tipos de moneda"
  currenciesAll: Currencies;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private http: HttpClient,
    private currenciesService: CurrenciesService,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
   }

  ngOnInit(): void {
    this.getCurrencies();
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

  eliminarPlan(id:number){
    this.currenciesService.deleteCurrency(id).subscribe(
      response =>{
        this.getCurrencies();
      },
      error=>{
        this.msm_error = 'No se pudo eliminar, vuelva a intentar.'
      }
      );
      this.ngOnInit();
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
