import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-historialpagos',
  templateUrl: './user-historialpagos.component.html',
  styleUrls: ['./user-historialpagos.component.css']
})
export class UserHistorialpagosComponent implements OnInit {
  title = "Historial Mis Pagos"
  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
