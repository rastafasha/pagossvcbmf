import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '@app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
  passwordForm: FormGroup;
  public formSumitted = false;



  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private location: Location,

  ) { }

  ngOnInit(): void {
    this.validarFormularioPassword();
  }



  validarFormularioPassword(){
    this.passwordForm = this.fb.group({
      email: ['', Validators.required],
    });
  }



cambiarPassword(){debugger
  const data = {
    ...this.passwordForm.value,
  }
  this.formSumitted = true;
    // console.log(this.registerForm.value);
    if(this.passwordForm.invalid){
      return;
    }

    //realizar el posteo del usuario
    this.userService.changePassword(data).subscribe(
      resp =>{
        // console.log(resp);
        this.router.navigateByUrl('/login');
      },(err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );

}

goBack() {
  this.location.back(); // <-- go back to previous location on cancel
}

}
