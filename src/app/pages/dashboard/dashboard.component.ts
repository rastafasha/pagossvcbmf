import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '@app/models/role';
import { User } from '@app/models/user';
import { RoleService } from '@app/services/role.service';
import { UserService } from '@app/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Panel Administrativo';
  public user: User;
  role: Role;

  error: string;
  constructor(
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {

    this.closeMenu();
    this.getUser();
    // this.activatedRoute.params.subscribe( ({id}) => this.getRolbyId(id));
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // return this.userService.getUserLocalStorage();
    console.log(this.user);
    console.log(this.user.id);
    this.getRolbyId(this.user.id);

  }

  getRolbyId(id:number): void {
    this.roleService.getRolbyId(id).subscribe(
      res =>{
        this.role = res;
        error => this.error = error
        console.log('User rol', this.role.id)
      }
    );
  }

}
