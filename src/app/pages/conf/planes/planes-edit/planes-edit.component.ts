import { Component, OnInit, ViewChild, isDevMode } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { Plan } from '@app/models/plan';
import { PlanesService } from '@app/services/planes.service';

import { Currencies } from '@app/models/currencies';
import { CurrenciesService } from '@app/services/currencies.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertService } from '@app/services/alert.service';

import { ToastrService } from 'ngx-toastr';
import { AccountService } from '@app/services/account.service';
import { environment } from '@environments/environment';

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

  editEmployeeForm: Plan = new Plan('','','','');

  @ViewChild("employeeForm")
  // employeeForm!: NgForm;

  isSubmitted: boolean = false;
  employeeId: any;

  employeeForm: FormGroup;
  title : string;
  public currenciesAll: Currencies;

  // ngform
  public name: string;
  public price: string;
  public currency_id: string;
  public status: string;
  public fileInputValue: File;
  // public textInputValue: string;
  // public priceInputValue: string;
  // public currencyIdInputValue: string;
  // public statusInputValue: string;
  // public fileInputValue: File;

  plan:Plan;
  planSeleccionado:Plan;
  id:number;





  constructor(
    private route: ActivatedRoute, private router: Router,
    private planService: PlanesService,
    private toastr: ToastrService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private currenciesService: CurrenciesService,
    private accountService: AccountService,
    ) { }

  ngOnInit(): void {
    this.getCurrencies();
    this.validarFormulario();
    this.activatedRoute.params.subscribe( ({id}) => this.getEmployeeDetailById(id));
    // this.activatedRoute.params.subscribe( ({id}) => this.getplan(id));


    if(this.planSeleccionado){
      //actualizar
      this.title = 'Creando Plan';

    }else{
      //crear
      this.title = 'Edit Plan';
    }
  }


  getEmployeeDetailById(id) {debugger
    if (id !== null && id !== undefined) {
      this.title = 'Editando Plan';
      this.planService.getPlan(+id).subscribe(
        res => {
          this.employeeForm.patchValue({
            id: res.id,
            name: res.name,
            price: res.price,
            status: res.status,
            currency_id: this.currenciesAll.id,
            fileInputValue: res.image,
          });
          this.planSeleccionado = res;
          console.log(this.planSeleccionado);
        }
      );
    } else {
      this.title = 'Creando Plan';
    }

  }

  public onFileSelect(event) {
    this.fileInputValue = event.target.files[0].name;
    console.log(this.fileInputValue);
      // this.employeeForm.get('image').setValue(file.name);
    }

  EditEmployee() {debugger
    this.isSubmitted = true;
    const formData = new FormData();

    formData.append('image', this.fileInputValue);
    formData.append('name', this.name);
    formData.append('price', this.price);
    formData.append('currency_id', this.currency_id);
    formData.append('status', this.status);

    const id = this.planSeleccionado.id;

    if(id){
      const datos = {
        ...this.employeeForm.value,
        image: this.fileInputValue,
        id: this.planSeleccionado.id
      }

      this.planService.updatePlan(datos).subscribe(async data => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/dashboard/planes']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/dashboard/planes']);
          }, 500);
        });
    }

}






  validarFormulario(){
    this.employeeForm = this.fb.group({
      name: ['',Validators.required],
      price: ['',Validators.required],
      status: ['',Validators.required],
      currency_id: ['',Validators.required],
      image: ['',Validators.required],
    })
  }





  // EditEmployee() {debugger
  //   this.isSubmitted = true;
  //   const formData = new FormData();

  //   formData.append('image', this.employeeForm.value.image);
  //   formData.append('name', this.textInputValue);
  //   formData.append('price', this.priceInputValue);
  //   formData.append('currency_id', this.currencyIdInputValue);
  //   formData.append('status', this.statusInputValue);


  //   if(this.planSeleccionado.id){
  //     const datos = {
  //       ...this.employeeForm.value,
  //       id: this.planSeleccionado.id,
  //     }

  //   this.planService.updatePlan(datos)
  //     .subscribe( (resp: any) =>{
  //       Swal.fire('Actualizado', `actualizado correctamente`, 'success');
  //       this.router.navigateByUrl(`/dashboard/planes`);

  //     });
  //   }

  // }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  getCurrencies(): void {
    this.currenciesService.getCurrencies().subscribe(
      res =>{
        this.currenciesAll = res;
      }
    );
  }



}




