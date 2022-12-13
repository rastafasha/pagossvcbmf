import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '@app/models/role';
import { User } from '@app/models/user';
import { AccountService } from '@app/services/account.service';
import { RoleService } from '@app/services/role.service';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  public user: User;

  error: string;
  role: Role;
  id: number;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
  ) {
    this.user = this.userService.user;
   }

  ngOnInit(): void {
    this.getUser();
    // this.activatedRoute.params.subscribe( ({id}) => this.getRolbyId(id));
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // return this.userService.getUserLocalStorage();
    // console.log(this.user);
    // console.log(this.user.id);
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

  logout(): void {
    this.accountService.logout();
  }

}
