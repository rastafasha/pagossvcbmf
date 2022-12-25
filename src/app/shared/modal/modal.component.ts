import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Payment } from '@app/models/payment';
import { PaymentService } from '@app/services/payment.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public verificarPagoForm: FormGroup;

  pagoSeleccionado: Payment;
  pagos: Payment;
  error: string;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadPayment();
    // this.activatedRoute.params.subscribe( ({id}) => this.cargarForm(id));
  }

  validarFormulario(){
    this.verificarPagoForm = this.fb.group({
      status: ['Pendiente', ,Validators.required],
      validacion: ['',Validators.required],

    })
  }

  loadPayment(){
    this.paymentService.getAll().subscribe(
      (data: Payment) => this.pagos = data,
      error => this.error = error
    );
  }


  cargarForm(id: string){

    if (id) {
      this.paymentService.getPagoById(id).subscribe(
        res => {
          this.verificarPagoForm.patchValue({
            id: res.id,
            status: res.status,
            validacion: res.validacion,
          });
          this.pagoSeleccionado = res;
          console.log(this.pagoSeleccionado);
        }
      );
    } else {
      return;
    }

  }

  updateForm(){debugger

    const {status, validacion
    } = this.verificarPagoForm.value;

    if(this.pagoSeleccionado){
      //actualizar
      const data = {
        ...this.verificarPagoForm.value,
        id: this.pagoSeleccionado.id
      }
      this.paymentService.update(data).subscribe(
        resp =>{
          // Swal.fire('Actualizado', `${titulo}  actualizado correctamente`, 'success');
          console.log(this.pagoSeleccionado);
        });

    }else{
      //crear
      this.paymentService.create(this.verificarPagoForm.value)
      .subscribe( (resp: any) =>{
        // Swal.fire('Creado', `${titulo} creado correctamente`, 'success');
        // this.router.navigateByUrl(`/dashboard/blog`);
        console.log(this.pagoSeleccionado);

      })


    }

  }

}
