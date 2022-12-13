import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '@app/services/message.service';
import { ProductPaypal } from '@app/models/productPaypal';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '@app/services/payment.service';
import { UserService } from '../../services/user.service';
import { Payment } from '@app/models/payment';
import { Currencies } from '@app/models/currencies';
import { CurrenciesService } from '@app/services/currencies.service';

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
  error: string;
  pagoSeleccionado: ProductPaypal;
  pagoS: Payment;
  currenciesAll: Currencies;


  title= 'Realizar un Pago';
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private messageService: MessageService,
    private paymentService: PaymentService,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private currenciesService: CurrenciesService,
  ) {
    this.usuario = usuarioService.user;
  }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe( ({id}) => this.cargarForm(id));
    this.validarFormulario();
    this.visible= false;
    this.getCurrencies();
    this.getUser();
    console.log(this.usuario);
  }

  getUser(): void {

    this.usuario = JSON.parse(localStorage.getItem('user'));
    // return this.userService.getUserLocalStorage();
    // console.log(this.user);

  }

  getCurrencies(): void {
    this.currenciesService.getCurrencies().subscribe(
      res =>{
        this.currenciesAll = res;
        error => this.error = error
        console.log(this.currenciesAll);
      }
    );
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
      producto_id: [1],
      status: ['Pendiente'],
      user_id: [this.usuario.id],
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
            moneda_id: this.currenciesAll.id,
            referencia: res.referencia,
            user_id: this.usuario.id,
            producto_id: '1',
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

    const {metodo, bank_name, monto, moneda_id, referencia,
      user_id,producto_id,
    } = this.PaymentRegisterForm.value;

    if(this.pagoSeleccionado){
      //actualizar
      const data = {
        ...this.PaymentRegisterForm.value,
        id: this.pagoSeleccionado.id,
        user_id: this.usuario.id,
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
