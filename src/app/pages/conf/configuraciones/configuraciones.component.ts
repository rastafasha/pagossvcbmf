import { Component, OnInit, DoCheck } from '@angular/core';
import { Location } from '@angular/common';
import { Role } from '@app/models/role';
import { RoleService } from '@app/services/role.service';
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
  roles: Role[] = [];
  error: string;

  user: User;
  role: Role;

  constructor(
    private location: Location,
    private roleService: RoleService,
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

  getRoles(): void {

    this.roleService.getAll().subscribe(
      res =>{
        this.roles = res;
        error => this.error = error
      }
    );
  }

  ngDoCheck(): void {
    this.user = this.userService.user;
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
        console.log(this.role)
      }
    );
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
