import { Component, OnInit } from '@angular/core';
import { CmspageService } from '../../services/cmspage.service';
import { Contact } from '../../models/contact';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  title = "Contacto"
  error: string;

  contactForm:FormGroup;
  constructor(
    private router: Router,
    private cmspageService: CmspageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.iniciarFormulario();
  }

  iniciarFormulario(){
    this.contactForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
      })

  }


  get f() { return this.contactForm.controls; }

  enviarEmail() {
    this.cmspageService.contactForm(this.contactForm.value).subscribe(
      res => {
        if (this.error) {
          Swal.fire('Error', this.error, 'error');
        } else {
          Swal.fire('Enviado!', 'El email fue enviado', 'success');
          this.router.navigate(['/']);
        }
      },
      error => this.error = error
    );
  }



  gotoHome() {
    this.router.navigate(['/']);
  }

}