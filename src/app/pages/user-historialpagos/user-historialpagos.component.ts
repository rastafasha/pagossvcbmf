import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-user-historialpagos',
  templateUrl: './user-historialpagos.component.html',
  styleUrls: ['./user-historialpagos.component.css']
})
export class UserHistorialpagosComponent implements OnInit {
  title = "Historial Mis Pagos"
  constructor(
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.closeMenu();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }




}
