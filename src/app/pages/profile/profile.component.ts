import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/user';
import { Role, Permission } from '@app/models/role';
import { RoleService } from '@app/services/role.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = "Mi Cuenta";
  @Output() directorioUser : any;
  profileForm: FormGroup;
  imagePath: string;
  error: string;
  uploadError: boolean;

  identity: any;

  user: User;
  permisos: Permission;

  image:string;

  profileSeleccionado: User;


  constructor(
    private location: Location,
    private userService: UserService,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.closeMenu();
    this.getUser();
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getUserServer(id));
  }
  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    console.log(this.user.id);
  }

  getUserServer(id:number){
    this.userService.getUserById(id).subscribe(
      res =>{
        this.user = res;
        error => this.error = error
        console.log(this.user);
      }
    );
  }

  iniciarFormulario(id:number){
    // const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      let id = this.user.id;
      // this.pageTitle = 'Editar Directorio';
      this.userService.getUserById(id).subscribe(
        res => {
          this.profileForm.patchValue({
            id: res.id,
            // nombre: res.nombre,
            username: res.username,
            email: res.email,
            user_id: this.user.id,
          });
          this.imagePath = res.image;
          this.profileSeleccionado = res;
        }
      );
    }

    this.validarFormulario();

  }

  validarFormulario(){
    this.profileForm = this.fb.group({
      id: [''],
      // nombre: ['', Validators.required],
      username: ['', Validators.required],
      image: [this.image],
      user_id: [''],
    });
  }

  onSelectedFile(event) {debugger
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.get('image').setValue(file.name);
      // this.directorioForm.get('image').setValue(file);

      this.image = file.name;
    }
  }

  // get nombre() { return this.profileForm.get('nombre'); }
  get username() { return this.profileForm.get('username'); }


  updateForm() {debugger


    const formData = new FormData();
    // formData.append('nombre', this.profileForm.get('nombre').value);
    formData.append('username', this.profileForm.get('username').value);
    formData.append('image', this.profileForm.get('image').value);

    const id = this.profileForm.get('id').value;

    if (id) {
      const data = {
        ...this.profileForm.value,
        user_id: this.user.id,
        id: this.user.id
      }
      this.userService.update(data).subscribe(
        res => {
          if (this.error) {
            // this.uploadError = res.message;
            // Swal.fire('Error', this.uploadError, 'error');
          } else {
            // this.router.navigate(['/directorio']);
            // this.infoDirectorio = res;
            Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
          }
        },
        error => this.error = error
      );
    }

  }


}
