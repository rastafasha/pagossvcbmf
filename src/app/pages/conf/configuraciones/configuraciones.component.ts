import { Component, OnInit, DoCheck } from '@angular/core';
import { Location } from '@angular/common';
import { AccountService } from '@app/services/account.service';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/user';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit, DoCheck {

  title = "Configuraciones";
  error: string;

  user: User;

  constructor(
    private location: Location,
    private userService: UserService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.closeMenu();
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }


  ngDoCheck(): void {
    this.user = this.userService.user;
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
