import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

import { Plan } from '@app/models/plan';
import { PlanesService } from '@app/services/planes.service';

import { User } from 'src/app/models/user';
import { UserService } from '@app/services/user.service';
import { Currencies } from '@app/models/currencies';
import { CurrenciesService } from '@app/services/currencies.service';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { AlertService } from '@app/services/alert.service';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '@app/services/storage.service';
import { AccountService } from '@app/services/account.service';
interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-planes-edit',
  templateUrl: './planes-edit.component.html',
  styleUrls: ['./planes-edit.component.css']
})
export class PlanesEditComponent implements OnInit {

  title : string;

  serverUrl = environment.apiUrl;

  public planForm: FormGroup;
  public plan: Plan;
  public usuario: User;
  public currenciesAll: Currencies;
  public imagenSubir: File;
  public imgTemp: any = null;
  public file :File;
  public imgSelect : String | ArrayBuffer;
  public planSeleccionado: Plan;

  error: string;
  id:number
  image:any;


  constructor(
    private fb: FormBuilder,
    private planService: PlanesService,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private currenciesService: CurrenciesService,
    private fileUploadService: FileUploadService,
    private alertService: AlertService,
    private http:HttpClient
  ) {
    this.usuario = usuarioService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));
    this.getCurrencies();
    this.validarFormulario();

    // if(this.planSeleccionado){
    //   //actualizar
    //   this.title = 'Create Blog';

    // }else{
    //   //crear
    //   this.title = 'Edit Blog';
    // }
  }

  validarFormulario(){
    this.planForm = this.fb.group({
      name: ['',Validators.required],
      price: ['',Validators.required],
      currency_id: ['',Validators.required],
      status: [''],
      image: ['' ],
    })
  }

  getCurrencies(): void {
    this.currenciesService.getCurrencies().subscribe(
      res =>{
        this.currenciesAll = res;
        error => this.error = error;
      }
    );
  }

  iniciarFormulario(id: number){

    if (id !== null && id !== undefined) {
      this.title = 'Editando Plan';
      this.planService.getPlan(id).subscribe(
        res => {
          this.planForm.patchValue({
            id: res.id,
            name: res.name,
            price: res.price,
            status: res.status,
            currency_id: this.currenciesAll.id,
            image : res.image
          });
          this.planSeleccionado = res;
        }
      );
    } else {
      this.title = 'Creando Plan';
    }
  }


  get name() { return this.planForm.get('name'); }
  get price() { return this.planForm.get('price'); }
  get currency_id() { return this.planForm.get('currency_id'); }
  get status() { return this.planForm.get('status'); }

  updateBlog(){

    const formData = new FormData();
    formData.append('name', this.planForm.get('name').value);
    formData.append('price', this.planForm.get('price').value);
    formData.append('currency_id', this.planForm.get('currency_id').value);
    formData.append('status', this.planForm.get('status').value);
    formData.append('image', this.planForm.get('image').value);

    const {name, price, image, currency_id, status } = this.planForm.value;
    if(this.planSeleccionado){
      //actualizar
      const datos = {
        ...this.planForm.value,
        image: this.image,
        id: this.planSeleccionado.id,
      }
      this.planService.updatePlan(datos).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${name}  actualizado correctamente`, 'success');
        });


    }else{
      //crear

      this.planService.createPlan(this.planForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${name} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/planes`);
        this.enviarNotificacion();
      })
    }

    // this.subirImagen();

  }



  enviarNotificacion(): void {
    this.alertService.info("Mensaje de Monedas","Se ha creado una nueva moneda!");
  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
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

  subirImagen(){debugger
    const {image, id } = this.planForm.value;
    const datos = {
      ...this.planForm.value,
      image: this.imagenSubir.name,
      id: this.planSeleccionado.id,
    }
    this.planService.updatePlan(datos).subscribe(
      res=>{
        this.image = res;
        console.log(this.image)
          Swal.fire('Guardado', 'La imagen fue actualizada', 'success');
      }
    )
    // .actualizarFoto(this.imagenSubir, 'plans', this.planSeleccionado.id)
    // .then(img => { this.planSeleccionado.image = img;
    //   Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    // }).catch(err =>{
    //   Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    // })

  }






}
