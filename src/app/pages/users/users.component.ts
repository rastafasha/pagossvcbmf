import { Component, OnInit } from '@angular/core';

//Models
import { User } from '@app/models/user';
import { Role } from '@app/models/role';

//Services
import { UserService } from '@app/services/user.service';
import { RoleService } from '@app/services/role.service';
import { ConfirmService } from '@app/services/confirm.service';
import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  title = "Usuarios"

  loading = false;
  usersCount = 0;
  usuarios: User[]=[];
  user: User;
  roles: Role[] = [];

  p: number = 1;
  count: number = 8;

  error: string;
  msm_error: string;


  ServerUrl = environment.apiUrl;
  doctores;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private confirmService: ConfirmService,
    private location: Location,
    private http: HttpClient,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
    }

  ngOnInit(): void {

    this.getUsers();
    // this.getRoles();
    // this.closeMenu();
  }



  getUsers(): void {
    this.userService.getAll().subscribe(
      res =>{
        this.usuarios = res;
        error => this.error = error
      }
    );
  }


  // getRoles(): void {

  //       this.roleService.getAll().subscribe(
  //         res =>{
  //           this.roles = res;
  //           error => this.error = error
  //         }
  //       );
  // }

  showDeleteConfirm(id: any) {
    this.confirmService.openConfirmDialog("Seguro que desea borrar este usuario?" + id, "Eliminar", this.proced, id.toString(),this);

  }


  /*
   proced - Esta función se ejecuta en el ambito del servicio confirmService y no en esta clase.
            Por eso paso por referencia este objecto en la variable that y así poder ejecutar estos metodos.

   */
  public proced(id?: string, that?:any): void {

    if (id && that) {

      that.userService.deleteById(id).subscribe();

    }
  }

  eliminarUser(id:number){
    this.userService.deleteById(id).subscribe(
      response =>{
        this.getUsers();
      },
      error=>{
        this.msm_error = 'No se pudo eliminar el curso, vuelva a intentar.'
      }
      );
      this.ngOnInit();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  // search( text: string) {// funciona, devuelve la busqueda


  //   if( this.search.length == 0){
  //     return;
  //   }

  //   return this.http.get(this.ServerUrl + 'api_directorio/search?text=' + text )
  //     .toPromise()
  //     .then(doctores=>{
  //       this.doctores= {'results': JSON.stringify(doctores, null),

  //       'json': ()=>{
  //         return doctores;
  //       }

  //     };

  //     // devolver el array
  //     const mapped = Object.keys(doctores)
  //     .map(key => ({type: key, value: doctores[key]}));
  //     console.log(doctores);
  //     this.doctores = doctores;

  //     });

  // }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }



}
