import { Component, OnInit } from '@angular/core';
//Models
import { User } from '@app/models/user';
import { Role } from '@app/models/role';

//Services
import { RoleService } from '@app/services/role.service';
import { UserService } from '@app/services/user.service';
import { ConfirmService } from '@app/services/confirm.service';
import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { environment } from '@environments/environment';
import { DirectorioService } from '@app/services/directorio.service';
import { Directorio } from '@app/models/directorio';

@Component({
  selector: 'app-directorio-index',
  templateUrl: './directorio-index.component.html',
  styleUrls: ['./directorio-index.component.css']
})
export class DirectorioIndexComponent implements OnInit {

  title = "Directorio"

  loading = false;
  usersCount = 0;
  usuarios: User[]=[];
  user: User;
  roles: Role[] = [];
  directories: Directorio;

  p: number = 1;
  count: number = 8;

  error: string;
  msm_error: string;


  ServerUrl = environment.apiUrl;

  constructor(
    private directorioService: DirectorioService,
    private roleService: RoleService,
    private confirmService: ConfirmService,
    private location: Location,
    private http: HttpClient,
    private userService: UserService,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
    }

  ngOnInit(): void {
    this.userService.closeMenu();
    this.getDirectorios();
  }

  getDirectorios(): void {
    this.directorioService.getDirectorios().subscribe(
      res =>{
        this.directories = res;
        error => this.error = error;
        console.log(this.directories);
      }
    );
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
