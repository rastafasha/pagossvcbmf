import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '@app/models/role';
import { User } from '@app/models/user';
import { RoleService } from '@app/services/role.service';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-menuiconos',
  templateUrl: './menuiconos.component.html',
  styleUrls: ['./menuiconos.component.css']
})
export class MenuiconosComponent implements OnInit {

  public user: User;

  error: string;
  roleid:number;
  id:number;

  constructor(
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) {
    this.user = this.userService.user;
  }


  ngOnInit(): void {
    this.getUser();

  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));


  }




}
