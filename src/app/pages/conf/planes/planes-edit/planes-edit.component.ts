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

@Component({
  selector: 'app-planes-edit',
  templateUrl: './planes-edit.component.html',
  styleUrls: ['./planes-edit.component.css']
})
export class PlanesEditComponent implements OnInit {

  title : string;

  public planForm: FormGroup;
  public plan: Plan;
  public usuario: User;
  currenciesAll: Currencies;
  error: string;
  public imagenSubir: File;
  public imgTemp: any = null;
  public file :File;
  imagePath: string;
  planSeleccionado: Plan;

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
  ) {
    this.usuario = usuarioService.user;
    const base_url = environment.apiUrl;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));
    this.validarFormulario();
    this.getCurrencies();


  }

  validarFormulario(){
    this.planForm = this.fb.group({
      name: ['',Validators.required],
      price: ['',Validators.required],
      currency_id: ['',Validators.required],
      status: [''],
      image: [this.image || 'no-image.jpg' ],
    })
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
          });
          this.imagePath = res.image;
          this.planSeleccionado = res;
          console.log(this.planSeleccionado);
        }
      );
    } else {
      this.title = 'Creando Plan';
    }

  }

  onSelectedFile(event) {
    if (event.file.length > 0) {
      const file = event.file;
      this.planForm.get('image').setValue(file.name);
    }
    this.image = this.file.name;
  }
  get name() { return this.planForm.get('name'); }
  get price() { return this.planForm.get('price'); }
  get currency_id() { return this.planForm.get('currency_id'); }
  get status() { return this.planForm.get('status'); }

  updateBlog(){debugger

    const formData = new FormData();
    formData.append('name', this.planForm.get('name').value);
    formData.append('price', this.planForm.get('price').value);
    formData.append('currency_id', this.planForm.get('currency_id').value);
    formData.append('status', this.planForm.get('status').value);
    formData.append('image', this.planForm.get('image').value);

    const {name, price, currency_id, status } = this.planForm.value;
    if(this.planSeleccionado){
      //actualizar
      const data = {
        ...this.planForm.value,
        id: this.planSeleccionado.id,
      }
      this.planService.updatePlan(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${name}  actualizado correctamente`, 'success');
          console.log(this.planSeleccionado);
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

  enviarNotificacion(): void {
    this.alertService.info("Mensaje de Monedas","Se ha creado una nueva moneda!");
  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  // cambiarImagen(file: File){debugger
  //   this.imagenSubir = file;

  //   if(!file){
  //     return this.imgTemp = null;
  //   }

  //   const reader = new FileReader();
  //   const url64 = reader.readAsDataURL(file);

  //   reader.onloadend = () =>{
  //     this.imgTemp = reader.result;
  //   }
  // }

  subirImagen(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'plans', this.planSeleccionado.id)
    .then(img => { this.planSeleccionado.image = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }

}
