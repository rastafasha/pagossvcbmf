import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  title = "Ayuda | FAQ"
  constructor(
    private userService: UserService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.closeMenu();
    window.scrollTo(0,0);
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
