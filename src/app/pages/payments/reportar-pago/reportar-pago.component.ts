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
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { environment } from 'src/environments/environment';
import { CartItemModel } from '../../../models/cart-item-model';
import { Plan } from '@app/models/plan';
import { StorageService } from '@app/services/storage.service';
import { AlertService } from '@app/services/alert.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-reportar-pago',
  templateUrl: './reportar-pago.component.html',
  styleUrls: ['./reportar-pago.component.css']
})
export class ReportarPagoComponent implements OnInit {

  title= 'Realizar un Pago';

  @Input() cartItem: CartItemModel;
  cartItems: any[] = [];
  Item: any[] = [];
  total= 0;

  // public product: ProductPaypal;

  public PaymentRegisterForm: FormGroup;
  public usuario;
  visible :boolean = false;

  metodo:string;
  error: string;
  pagoSeleccionado: Payment;
  pagoS: Payment;
  currenciesAll: Currencies;
  plan: Plan;

  image:string;
  uploadError: boolean;
  imagePath: string;

  public imagenSubir: File;
  public imgTemp: any = null;
  public file:File;
  public imgSelect : String | ArrayBuffer;

  paymentSeleccionado:Payment;

  user:User;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private messageService: MessageService,
    private paymentService: PaymentService,
    private usuarioService: UserService,
    private fileUploadService: FileUploadService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private currenciesService: CurrenciesService,
    private storageService: StorageService,
    private alertService: AlertService,
  ) {
    this.user = this.usuarioService.user;
  }


  ngOnInit(): void {
    // this.activatedRoute.params.subscribe( ({id}) => this.cargarForm(id));
    this.validarFormulario();
    this.visible= false;
    this.getCurrencies();
    this.getUser();
    this.closeCart();
    console.log(this.usuario);
    if(this.storageService.existCart()){
      this.cartItems = this.storageService.getCart();
    }
    this.total = this.getTotal();


    // this.imagePath = environment.apiUrlMedia;
  }

  getUser(): void {
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }


  getTotal():number{
    let total =  0;
    this.cartItems.forEach(item => {
      total += item.quantity * item.productPrice;
    });
    return +total.toFixed(2);
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
      moneda_codigo: [''],
      referencia: [''],
      email: [''],
      nombre: [''],
      plan_id: [1],
      status: ['PENDING'],
      validacion: ['PENDING'],
      txn_id: [1],
      user_id: [''],
      image: [this.imagenSubir],
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
            moneda_codigo: this.currenciesAll.name,
            referencia: res.referencia,
            email: res.email,
            nombre: res.nombre,
            status: res.status,
            validacion: res.validacion,
            txn_id: res.txn_id,
            user_id: this.user.id,
            plan_id: '1',
            // image: this.imagenSubir
          });
          // this.imagePath  = res.image;

          this.pagoSeleccionado = res;
          console.log(this.pagoSeleccionado);
        }
      );
    } else {
      return;
    }

  }

  onSelectedFile(event) {

    console.log(event);
        this.file = event.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () =>{
          this.imgTemp = reader.result;
        }

        reader.readAsDataURL(this.file);
  }

  updateForm(){

    const formData = new FormData();
    formData.append('metodo', this.PaymentRegisterForm.get('metodo').value);
    formData.append('bank_name', this.PaymentRegisterForm.get('bank_name').value);
    formData.append('monto', this.PaymentRegisterForm.get('monto').value);
    formData.append('moneda_codigo', this.PaymentRegisterForm.get('moneda_codigo').value);
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
      this.enviarNotificacion();
    })

  }

  enviarNotificacion(): void {
    this.alertService.success("Mensaje de Pago","Nuevo Pago, Favor verificar!");
  }

  closeCart(){
    var cartNotification = document.getElementsByClassName("cart-modal");
      for (var i = 0; i<cartNotification.length; i++) {
        cartNotification[i].classList.remove("cart-modal--active");

      }
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


  cambiarImagen(file: File){
    this.imagenSubir = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'payments', this.paymentSeleccionado.id)
    .then(img => { this.paymentSeleccionado.imagen = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }


}
