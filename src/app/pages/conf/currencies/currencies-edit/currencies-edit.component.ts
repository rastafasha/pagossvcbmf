import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user';
import { UserService } from '@app/services/user.service';
import { Currencies } from '@app/models/currencies';
import { CurrenciesService } from '@app/services/currencies.service';
import { AlertService } from '@app/services/alert.service';


@Component({
  selector: 'app-currencies-edit',
  templateUrl: './currencies-edit.component.html',
  styleUrls: ['./currencies-edit.component.css']
})
export class CurrenciesEditComponent implements OnInit {

  title : string;

  public currencyForm: FormGroup;
  public currency: Currencies;
  public usuario: User;
  currenciesAll: Currencies;
  error: string;

  idcurrency:any;

  public currencySeleccionado: Currencies;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private currenciesService: CurrenciesService,
    private alertService: AlertService,
  ) {
    this.usuario = usuarioService.user;
    const base_url = environment.apiUrl;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.cargarCurrency(id));
    this.validarFormulario();
    window.scrollTo(0,0);

    if(this.currencySeleccionado){
      //actualizar
      this.title = 'Creando Moneda';

    }else{
      //crear
      this.title = 'Edit Moneda';
    }
  }

  validarFormulario(){
    this.currencyForm = this.fb.group({
      name: ['',Validators.required],
    })
  }

  cargarCurrency(id: number){


    if (id !== null && id !== undefined) {
      this.title = 'Editando Moneda';
      this.currenciesService.getCurrency(id).subscribe(
        res => {
          this.currencyForm.patchValue({
            id: res.id,
            name: res.name,
          });
          this.currencySeleccionado = res;
          console.log(this.currencySeleccionado);
        }
      );
    } else {
      this.title = 'Creando Moneda';
    }

  }

  updateBlog(){

    const {name } = this.currencyForm.value;

    if(this.currencySeleccionado){debugger
      //actualizar
      const data = {
        ...this.currencyForm.value,
        id: this.currencySeleccionado.id
      }
      this.currenciesService.updateCurrency(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${name}  actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/currencies`);
          console.log(this.currencySeleccionado);
        });

    }else{
      //crear
      this.currenciesService.createCurrency(this.currencyForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${name} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/currencies`);
        this.enviarNotificacion();
      })
    }

  }

  enviarNotificacion(): void {
    this.alertService.success("Mensaje de Monedas","Se ha creado una nueva moneda!");
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
