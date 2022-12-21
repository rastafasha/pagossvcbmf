import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../services/user.service';
import { RoleService } from '../../../../services/role.service';
import {User} from '../../../../models/user';
import {Role} from '../../../../models/role';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-view',
  templateUrl: './roles-view.component.html',
  styleUrls: ['./roles-view.component.css']
})
export class RolesViewComponent implements OnInit {

   title = "Roles";
  users: User[] = [];
  user: User;
  // roles: Role[] = [];
  role: Role;
  p: number = 1;
  count: number = 8;

  error: string;
  msm_error: string;

  rolesSelected:number;

  rolesForm: FormGroup;

  constructor(
    private fb:FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    // this.getRoles();
  }

  getUsers(): void {
    this.userService.getAll().subscribe(
      res =>{
        this.users = res;
        this.user.role = res;
        error => this.error = error;
      }
    );
  }


  getRoles(): void {

    this.roleService.getAll().subscribe(
      res =>{
        // this.roles = res;
        error => this.error = error
      }
    );
  }

  validarFormulario(){
    this.rolesForm = this.fb.group({
      rolesSelected: [''],
    })
  }

  cambiarRole(id: number){
    this.userService.update(id).subscribe(
      resp =>{ console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success')
      }
    )
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
