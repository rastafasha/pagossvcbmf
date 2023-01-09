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
  user: User;

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
    this.activatedRoute.params.subscribe( ({id}) => this.cargarPayment(id));
    this.validarFormulario();
  }

  validarFormulario(){
    this.paymentForm = this.fb.group({
      status: ['',Validators.required],
      validacion: ['',Validators.required],
      user_id: [''],
    })
  }

  cargarPayment(id: any){


    if (id !== null && id !== undefined) {
      this.title = 'Verificando Pago';
      this.paymentsService.getPagoById(id).subscribe(
        res => {
          this.paymentForm.patchValue({
            id: res.id,
            status: res.status,
            validacion: res.validacion,

            metodo: res.metodo,
            bank_name: res.bank_name,
            monto: res.monto,
            currency_id: res.currency_id,
            moneda_codigo: res.moneda_codigo,
            referencia: res.referencia,
            email: res.email,
            nombre: res.nombre,
            txn_id: res.txn_id,
            user_id: res.user_id,
          });
          this.paymentSeleccionado = res;
          console.log(this.paymentSeleccionado);
        }
      );
    } else {
      this.title = 'Creando Pago';
    }

  }

  updateBlog(){debugger

    const {status, user_id,  validacion } = this.paymentForm.value;

    if(this.paymentSeleccionado){
      //actualizar
      const data = {
        ...this.paymentForm.value,
        user_id: this.paymentSeleccionado.user_id,
        payment: this.paymentSeleccionado,
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

  openAproved(){
    const Toasttest = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      // didOpen: (toast) => {
      //   toast.addEventListener('mouseenter', Swal.stopTimer)
      //   toast.addEventListener('mouseleave', Swal.resumeTimer)
      // }
    })

    Toasttest.fire({
      icon: 'success',
      title: 'Pago Aprobado!'
    })
  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
