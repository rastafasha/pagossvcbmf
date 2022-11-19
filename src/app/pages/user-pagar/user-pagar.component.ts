import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-pagar',
  templateUrl: './user-pagar.component.html',
  styleUrls: ['./user-pagar.component.css']
})
export class UserPagarComponent implements OnInit {

  title= 'Realizar un Pago';
  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
