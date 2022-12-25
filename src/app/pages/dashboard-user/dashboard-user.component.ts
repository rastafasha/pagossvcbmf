import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  title = 'Admin Usuario';
  public user: User;

  error: string;

  constructor(
    private userService: UserService,
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {

    this.closeMenu();
    this.getUser();
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    console.log(this.user.id);


  }



}
