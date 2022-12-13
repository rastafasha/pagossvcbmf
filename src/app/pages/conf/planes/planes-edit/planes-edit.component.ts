import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { User } from 'src/app/models/user';
import { Plan } from '@app/models/plan';
import { PlanesService } from '@app/services/planes.service';
import { UserService } from '@app/services/user.service';
import { Currencies } from '@app/models/currencies';
import { CurrenciesService } from '@app/services/currencies.service';


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
  planSeleccionado: Plan;
  imagePath: string;

  constructor(
    private fb: FormBuilder,
    private planService: PlanesService,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private currenciesService: CurrenciesService,
    private fileUploadService: FileUploadService,
  ) {
    this.usuario = usuarioService.user;
    const base_url = environment.apiUrl;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.cargarBlog(id));
    this.validarFormulario();
    this.getCurrencies();


  }

  validarFormulario(){
    this.planForm = this.fb.group({
      name: ['',Validators.required],
      price: ['',Validators.required],
      currency_id: ['',Validators.required],
      status: [false],
      image: [''],
    })
  }

  cargarBlog(id: any){

    if (id !== null && id !== undefined) {
      this.title = 'Editando Plan';
      this.planService.getPlan(id).subscribe(
        res => {
          this.planForm.patchValue({
            id: res.id,
            name: res.name,
            price: res.price,
            currency_id: this.currenciesAll.id,
            status: res.status,
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
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.planForm.get('image').setValue(file);
    }
  }

  updateBlog(){debugger

    const formData = new FormData();
    formData.append('image', this.planForm.get('image').value.name);

    const {name, price, currency_id, status, image } = this.planForm.value;
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

  // subirImagen(){
  //   this.fileUploadService
  //   .actualizarFoto(this.imagenSubir, 'plans', this.planSeleccionado.id)
  //   .then(img => { this.planSeleccionado.image = img;
  //     Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

  //   }).catch(err =>{
  //     Swal.fire('Error', 'No se pudo subir la imagen', 'error');

  //   })
  // }

}
