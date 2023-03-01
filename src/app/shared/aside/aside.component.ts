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
  public role: Role;
  id: any;
  roleid:number;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
  ) {
    this.user = userService.user;
   }

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = this.user.id;
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
  }

  getUserProfile(id:number){
    this.userService.getUserById(id).subscribe((data: any) => {
      this.user = data;
      console.log(this.user)
    });
  }


  logout(): void {
    this.accountService.logout();
  }

}
