import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

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

  planSeleccionado: Plan;

  constructor(
    private fb: FormBuilder,
    private planService: PlanesService,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private currenciesService: CurrenciesService,
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
      this.title = 'Edit Plan';
      this.planService.getPlan(this.plan).subscribe(
        res => {
          this.planForm.patchValue({
            id: res.id,
            name: res.name,
            price: res.price,
            currency_id: this.currenciesAll.id,
            status: res.status,
            image : res.image
          });
          // this.planSeleccionado = res;
          // console.log(this.planSeleccionado);
        }
      );
    } else {
      this.title = 'Crear Plan';
    }

  }

  updateBlog(){debugger

    const {name, price, currency_id, status, } = this.planForm.value;

    if(this.planSeleccionado){
      //actualizar
      const data = {
        ...this.planForm.value,
        id: this.planSeleccionado.id
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

}
