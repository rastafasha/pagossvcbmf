import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

//Models
import { User } from '@app/models/user';

//Services
import { UserService } from '@app/services/user.service';
import { RoleService } from '@app/services/role.service';
import { MemberService } from '@app/services/member.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {

  @Output() directorioUser : any;

  title = "Detalles de la cuenta";
  form: FormGroup;
  user: User;

  error: string;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    private location: Location
    ) {

      this.form = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        universidad: ['', Validators.required],
        especialidad: ['', [Validators.required]],
        ano: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        ciudad: ['', [Validators.required]],
        direccion: ['', [Validators.required]],
        telefonos: ['', [Validators.required]],
        email: ['', [Validators.required]],
        instagram: ['', []],
        twitter: ['', []],
        facebook: ['', []],
        linkedin: ['', []],


      });
  }

  ngOnInit(): void {
    this.userService.closeMenu();
    this.activatedRoute.params.subscribe( ({id}) => this.getUser(id));
    // this.getUser();
  }

  get f() { return this.form.controls; }

  save() {
    console.info('guardando');
    console.log(this.f)
  }
s

  getUser(id:number){
    this.userService.getUserById(id).subscribe(
      res =>{
        this.user = res;
        error => this.error = error
        console.log(this.user);
      }
    );
  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
