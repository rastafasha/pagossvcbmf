import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Plan } from '@app/models/plan';
import { User } from '@app/models/user';
import { PlanesService } from '@app/services/planes.service';

@Component({
  selector: 'app-planesyproductos',
  templateUrl: './planesyproductos.component.html',
  styleUrls: ['./planesyproductos.component.css']
})
export class PlanesyproductosComponent implements OnInit {

  planes: Plan;
  user: User;
  error: string;

  constructor(
    private http: HttpClient,
    private planesService: PlanesService,
  ) { }

  ngOnInit(): void {
    this.getPlanes();
  }

  getPlanes(): void {
    this.planesService.getPlanes().subscribe(
      res =>{
        this.planes = res;
        error => this.error = error
        console.log(this.planes);
      }
    );
  }

}
