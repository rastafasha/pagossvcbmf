import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '@app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/models/user';
import { AlertService } from '@app/services/alert.service';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-user-historialpagos',
  templateUrl: './user-historialpagos.component.html',
  styleUrls: ['./user-historialpagos.component.css']
})
export class UserHistorialpagosComponent implements OnInit {
  title = "Historial Mis Pagos";
  userProfile!: User;
  user: User;
  id:number;

  p: number = 1;
  count: number = 8;

  constructor(
    private location: Location,
    private alertService: AlertService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.userService.closeMenu();
    this.getUser();
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = this.user.id;
    this.getUserProfile();


  }

  getUserProfile(){

    this.userService.getUserById(this.user.id).subscribe((data: any) => {
      this.userProfile = data[0];
      console.log('userProfile',this.userProfile)
    });
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }




}
