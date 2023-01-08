import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  title = 'Panel Administrativo';
  public user: User;
  public userProfile: User;

  error: string;
  id:number;

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
    this.id = this.user.id;
    // this.getUserRemoto(this.id);


  }

  getUserRemoto(id:number){
    this.userService.getUserById(id).subscribe(
      res =>{
        this.userProfile = res[0];
        error => this.error = error
        console.log(this.userProfile);
      }
    );

  }




}
