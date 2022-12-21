import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  title = "Ayuda | FAQ"
  constructor(
    private userService: UserService
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

}
