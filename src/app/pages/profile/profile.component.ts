import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/user';
import { Role, Permission } from '@app/models/role';
import { RoleService } from '@app/services/role.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = "Mi Cuenta";
  identity: any;
  error: string;

  user: User;
  role: Role;
  permisos: Permission;

  constructor(
    private location: Location,
    private userService: UserService,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
  ) {
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
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    console.log(this.user.id);
  }



}
