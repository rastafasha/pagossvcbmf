import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = "Mi Cuenta";
  identity: any;
  error: string;

  constructor(
    private location: Location,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getUser(): void {debugger
    this.userService.profileUser().subscribe(
      res =>{
        this.identity = res;
        error => this.error = error
        console.log(this.identity);
      }
    );
  }

}
