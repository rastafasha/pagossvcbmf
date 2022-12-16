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
    this.getUser();
    this.activatedRoute.params.subscribe( ({id}) => this.getRolbyId(id));
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // return this.userService.getUserLocalStorage();
    this.getRolbyId(this.user.id);

  }

  getRolbyId(id:number): void {

    this.roleService.getRolbyId(id).subscribe(
      res =>{
        this.role = res;
        error => this.error = error
      }
    );
  }



  // getRolbyId(id:number): void {

  //   this.roleService.getRolbyId(id).subscribe(
  //     res =>{
  //       this.role = res;
  //       this.permisos = res.role[0].permissions;
  //       error => this.error = error
  //       console.log(this.role)
  //       console.log(this.permisos)
  //     }
  //   );
  // }

}
