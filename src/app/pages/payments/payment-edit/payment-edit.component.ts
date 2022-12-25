import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user';
import { UserService } from '@app/services/user.service';
import { Payment } from '@app/models/payment';
import { PaymentService } from '@app/services/payment.service';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.css']
})
export class PaymentEditComponent implements OnInit {

  title : string;

  public paymentForm: FormGroup;
  public payment: Payment;
  public usuario: User;
  payments: Payment;
  error: string;

  idcurrency:any;

  paymentSeleccionado: Payment;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private paymentsService: PaymentService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.cargarBlog(id));
    this.validarFormulario();
  }

  validarFormulario(){
    this.paymentForm = this.fb.group({
      status: ['',Validators.required],
      validacion: ['',Validators.required],
    })
  }

  cargarBlog(id: any){


    if (id !== null && id !== undefined) {
      this.title = 'Editando Moneda';
      this.paymentsService.getPagoById(id).subscribe(
        res => {
          this.paymentForm.patchValue({
            id: res.id,
            status: res.status,
            validacion: res.validacion,
          });
          this.paymentSeleccionado = res;
          console.log(this.paymentSeleccionado);
        }
      );
    } else {
      this.title = 'Creando Moneda';
    }

  }

  updateBlog(){

    const {status, validacion } = this.paymentForm.value;

    if(this.paymentSeleccionado){
      //actualizar
      const data = {
        ...this.paymentForm.value,
        id: this.paymentSeleccionado.id
      }
      this.paymentsService.update(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${status}  actualizado correctamente`, 'success');
          console.log(this.paymentSeleccionado);
        });

    }else{
      return;
    }

  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
