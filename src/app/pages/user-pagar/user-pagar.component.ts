import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '@app/services/message.service';
import { ProductPaypal } from '@app/models/productPaypal';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '@app/services/payment.service';
import { UserService } from '../../services/user.service';
import { Payment } from '@app/models/payment';

@Component({
  selector: 'app-user-pagar',
  templateUrl: './user-pagar.component.html',
  styleUrls: ['./user-pagar.component.css']
})
export class UserPagarComponent implements OnInit {

  public product: ProductPaypal;

  public PaymentRegisterForm: FormGroup;
  public file :File;
  usuario;
  visible :boolean = false;

  metodo:string;

  pagoSeleccionado: ProductPaypal;
  pagoS: Payment;


  title= 'Realizar un Pago';
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private messageService: MessageService,
    private paymentService: PaymentService,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.usuario = usuarioService.user;
  }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe( ({id}) => this.cargarForm(id));
    this.validarFormulario();
    this.visible= false;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  validarFormulario(){
    this.PaymentRegisterForm = this.fb.group({
      metodo: ['',Validators.required],
      bank_name: [''],
      monto: ['',Validators.required],
      moneda_id: ['',Validators.required],
      referencia: [''],
      fecha: ['',Validators.required],
      user_id: [2],
      producto_id: [1],
      status: ['Pendiente'],
    })
  }

  cargarForm(id: string){

    if (id) {
      this.paymentService.get(id).subscribe(
        res => {
          this.PaymentRegisterForm.patchValue({
            metodo: res.metodo,
            bank_name: res.bank_name,
            monto: res.monto,
            moneda_id: res.moneda_id,
            referencia: res.referencia,
            fecha: res.fecha,
            user_id: '1',
            producto_id: '1',
            // user_id: this.usuario.uid,
            img : res.img
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

    const {metodo, bank_name, monto, moneda_codigo, referencia, fecha,
      user_id,producto_id, email, nombre, status
    } = this.PaymentRegisterForm.value;

    if(this.pagoSeleccionado){
      //actualizar
      const data = {
        ...this.PaymentRegisterForm.value,
        id: this.pagoSeleccionado.id
      }
      this.paymentService.update(data).subscribe(
        resp =>{
          // Swal.fire('Actualizado', `${titulo}  actualizado correctamente`, 'success');
          console.log(this.pagoSeleccionado);
        });

    }else{
      //crear
      this.paymentService.create(this.PaymentRegisterForm.value)
      .subscribe( (resp: any) =>{
        // Swal.fire('Creado', `${titulo} creado correctamente`, 'success');
        // this.router.navigateByUrl(`/dashboard/blog`);
        console.log(this.pagoSeleccionado);

      })


      this.addToCart();
    }

  }

  addToCart(): void{
    console.log('sending...')
    this.messageService.sendMessage(this.pagoS);
  }

  verpaypal(){
    var verPaypalpay = document.getElementsByClassName("vibiblepayp");
      for (var i = 0; i<verPaypalpay.length; i++) {
        verPaypalpay[i].classList.toggle("vibiblepaypblok");

      }
  }
  hidepaypal(){
    var verPaypalpay = document.getElementsByClassName("vibiblepayp");
      for (var i = 0; i<verPaypalpay.length; i++) {
        verPaypalpay[i].classList.remove("vibiblepaypblok");

      }
  }
}
