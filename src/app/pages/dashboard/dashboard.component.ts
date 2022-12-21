import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  // role: Role;
  id:number;
  roleid:number;

  error: string;


  constructor(
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    public router: Router
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.closeMenu();

    this.getUser();
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserfromLocalRemoto(id));


  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
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


}
