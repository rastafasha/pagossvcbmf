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
  id: number;
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
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserfromLocalRemoto(id));
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));

    this.id = this.user.id;
    // this.getUserfromLocalRemoto(this.id);
  }

  // getUserfromLocalRemoto(id:number){
  //   this.user = JSON.parse(localStorage.getItem('user'));//trae el usuario desde localStorage

  //   this.id = this.user.id;

  //   this.userService.getUserById(this.id).subscribe(//insertamos el id del usuario y lo buscamos al db
  //     res=>{
  //       this.user= res;
  //       console.log(this.user);


  //       this.roleid = this.user.roles[0].id;
  //       console.log('esto rol',this.roleid);

  //       if(this.roleid !== null && this.roleid !== undefined){

  //         this.roleService.getRolbyId(this.roleid).subscribe(
  //           (res:Role) =>{
  //             this.role = res;
  //             error => this.error = error
  //             console.log('el arreglo rol es',this.role)
  //             console.log('el numero rol es',this.role.id)
  //           }
  //         );
  //       }
  //     }
  //   )
  // }

  logout(): void {
    this.accountService.logout();
  }

}
