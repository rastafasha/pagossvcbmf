import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSumitted = false;

  registerForm:FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: [ '', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")] ],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terminos: [false, Validators.required],

    }, {
      validators: this.passwordsIguales('password', 'password2')

    });

  }

  ngOnInit(): void {
  }

  crearUsuario(){
    this.formSumitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      return;
    }

    //realizar el posteo del usuario
    this.accountService.crearUsuario(this.registerForm.value).subscribe(
      resp =>{
        console.log(resp);
        this.router.navigateByUrl('/login');
      },(err) => {
        // Swal.fire('Error', err.error.msg, 'error');
      }
    );

  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSumitted;
  }

  campoNoValido(campo: string): boolean {
    if(this.registerForm.get(campo).invalid && this.formSumitted){
      return true;
    }else{
      return false;
    }


  }

  passwordNoValido(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if((pass1 !== pass2) && this.formSumitted){
      return true;
    }else{
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) =>{
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({noEsIgual: true});
      }
    }
  }

}
