import { Component, OnInit } from '@angular/core';

// import * as $ from "jquery";

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-dolar-today',
  templateUrl: './dolar-today.component.html',
  styleUrls: ['./dolar-today.component.css']
})
export class DolarTodayComponent implements OnInit {


  data: any;
  error: string

  constructor(
  ) { }

  ngOnInit(): void {
    this.getDolarPrice();
  }

  getDolarPrice(){

   //https://s3.amazonaws.com/dolartoday/data.json
  $.getJSON("https://s3.amazonaws.com/dolartoday/data.json",function(data){
    // console.log(data)
    $('#texto').html('Transferencia: '+data.USD.transferencia);
    $('#sicad').html('Sicad: ' + data.USD.sicad2);
    $('#bitcoin').html('Bitcoin: '+data.USD.bitcoin_ref);
    $('#localbitcoin').html('Local Bitcoin: '+data.USD.localbitcoin_ref);
    $('#dolatoday').html('Dolar Today: '+data.USD.dolartoday);
    $('#al').html('DolarToday al: '+data._timestamp.fecha);
      });


  }

}
