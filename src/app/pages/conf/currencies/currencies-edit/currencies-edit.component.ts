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

  currencySeleccionado: Currencies;

  constructor(
    private fb: FormBuilder,
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
  }

  validarFormulario(){
    this.currencyForm = this.fb.group({
      name: ['',Validators.required],
    })
  }

  cargarBlog(id: any){


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

    if(this.currencySeleccionado){
      //actualizar
      const data = {
        ...this.currencyForm.value,
        id: this.currencySeleccionado.id
      }
      this.currenciesService.updateCurrency(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${name}  actualizado correctamente`, 'success');
          console.log(this.currencySeleccionado);
        });

    }else{
      //crear
      this.currenciesService.createCurrency(this.currencyForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${name} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/currencies`);
      })
    }

  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
