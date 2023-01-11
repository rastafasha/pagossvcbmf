import { Component, OnInit } from '@angular/core';


//Services
import { PlanesService } from '@app/services/planes.service';
import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { Plan } from '@app/models/plan';
import { User } from '@app/models/user';


@Component({
  selector: 'app-planes-index',
  templateUrl: './planes-index.component.html',
  styleUrls: ['./planes-index.component.css']
})
export class PlanesIndexComponent implements OnInit {
  title = "Planes y productos"
  planes: Plan;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private http: HttpClient,
    private planesService: PlanesService,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
   }

  ngOnInit(): void {
    this.getPlanes();
  }

  getPlanes(): void {
    // return this.planesService.carga_info();
    this.planesService.getPlanes().subscribe(
      res =>{
        this.planes = res;
        error => this.error = error
        console.log(this.planes);
      }
    );
  }

  eliminarPlan(plan:Plan){
    this.planesService.deletePlan(plan).subscribe(
      response =>{
        this.getPlanes();
      },
      error=>{
        this.msm_error = 'No se pudo eliminar, vuelva a intentar.'
      }
      );
      this.ngOnInit();
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }



}
