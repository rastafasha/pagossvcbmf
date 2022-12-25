import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '@app/services/message.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Currencies } from '@app/models/currencies';
import { Payment } from '@app/models/payment';
import { User } from '@app/models/user';
import { CurrenciesService } from '@app/services/currencies.service';
import { PaymentService } from '@app/services/payment.service';
import { UserService } from '@app/services/user.service';



@Component({
  selector: 'app-reportar-pago',
  templateUrl: './reportar-pago.component.html',
  styleUrls: ['./reportar-pago.component.css']
})
export class ReportarPagoComponent implements OnInit {

  title= 'Realizar un Pago';

  // public product: ProductPaypal;

  public PaymentRegisterForm: FormGroup;
  public file :File;
  public usuario;
  visible :boolean = false;

  metodo:string;
  error: string;
  pagoSeleccionado: Payment;
  pagoS: Payment;
  currenciesAll: Currencies;

  image:string;
  uploadError: boolean;
  imagePath: string;

  user:User;
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
    this.user = this.usuarioService.user;
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
      currency_id: [''],
      // moneda_codigo: [''],
      referencia: [''],
      email: [''],
      nombre: [''],
      plan_id: [1],
      status: ['Pendiente'],
      user_id: [''],
      image: [this.image],
    })
  }

  cargarForm(id: string){

    if (id) {
      this.paymentService.getPagoById(id).subscribe(
        res => {
          this.PaymentRegisterForm.patchValue({
            metodo: res.metodo,
            bank_name: res.bank_name,
            monto: res.monto,
            currency_id: this.currenciesAll.id,
            // moneda_codigo: this.currenciesAll.name,
            referencia: res.referencia,
            email: res.email,
            nombre: res.nombre,
            user_id: this.user.id,
            plan_id: '1',
          });
          this.imagePath  = res.image;

          this.pagoSeleccionado = res;
          console.log(this.pagoSeleccionado);
        }
      );
    } else {
      return;
    }

  }

  onSelectedFile(event) {debugger
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.PaymentRegisterForm.get('image').setValue(file.name);
      // this.directorioForm.get('image').setValue(file);

      this.image = file.name;
    }
  }

  updateForm(){debugger



    const formData = new FormData();
    formData.append('metodo', this.PaymentRegisterForm.get('metodo').value);
    formData.append('bank_name', this.PaymentRegisterForm.get('bank_name').value);
    formData.append('monto', this.PaymentRegisterForm.get('monto').value);
    // formData.append('moneda_codigo', this.PaymentRegisterForm.get('moneda_codigo').value);
    formData.append('currency_id', this.PaymentRegisterForm.get('currency_id').value);
    formData.append('referencia', this.PaymentRegisterForm.get('referencia').value);
    formData.append('nombre', this.PaymentRegisterForm.get('nombre').value);
    formData.append('email', this.PaymentRegisterForm.get('email').value);
    formData.append('image', this.PaymentRegisterForm.get('image').value);


    //crear
    const data = {
      ...this.PaymentRegisterForm.value,
      user_id: this.usuario.id
    }
    this.paymentService.create(data)
    .subscribe( (resp: any) =>{
      // Swal.fire('Creado', `creado correctamente`, 'success');
      this.router.navigateByUrl(`/dashboard/factura`);
      console.log(this.pagoSeleccionado);

    })

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
