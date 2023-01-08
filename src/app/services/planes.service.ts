import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Plan } from '../models/plan';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  public plan: Plan;
  private panes = 'assets/dataSimulada/plan.json';

  info:any = {};
  cargada:boolean = false;

  products: Plan [] = [
    new Plan(1, 'Far Cary 6',  63.17, 'https://m.media-amazon.com/images/I/81AQ0wvcS-L._SL1500_.jpg', ),
    new Plan(2, 'Assassins Creed Valhalla',   24.99, 'https://m.media-amazon.com/images/I/817zvXdCgSL._SL1500_.jpg', ),
    new Plan(3, 'Spider-Man: Miles Morales', 46.00, 'https://m.media-amazon.com/images/I/71CqfmZX3PL._SL1361_.jpg', ),
    new Plan(4, 'Call of Duty: Vanguard', 86.96, 'https://m.media-amazon.com/images/I/71gPbEcd1pL._SL1378_.jpg', ),
    new Plan(5, 'Demons Souls',  49.95, 'https://m.media-amazon.com/images/I/81QoNRp5+WL._SL1353_.jpg', ),
    new Plan(6, 'Call of Duty: Black Ops Cold War',   40.99, 'https://m.media-amazon.com/images/I/81QfmDJdOdS._SL1500_.jpg', )
  ]

  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('auth_token') || '';
  }


  get headers(){
    return{
      headers: {
        'auth_token': this.token
      }
    }
  }

  get status(): 'APPROVED' | 'PENDING' | 'REJECTED' {
    return this.plan.status!;
  }

  public carga_info(){
    this.http.get( "assets/dataSimulada/plan.json " )
      .subscribe( data =>{
        //console.log( data.json() );
        this.cargada = true;
        this.info = data;
      } )

  }

  getProducts(): Plan[]{
    return this.products;
  }



  getPlanes()  {
    const url = `${baseUrl}/planes`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, plans: Plan}) => resp.plans)
      )
  }

  getPlan(id: number) {
    const url = `${baseUrl}/plan/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, plan: Plan}) => resp.plan)
        );
  }


  createPlan(plan:any) {
    const url = `${baseUrl}/plan/store`;
    return this.http.post(url, plan, this.headers);
  }

  updatePlan(plan:any) {
    const url = `${baseUrl}/planes/update/${plan}`;
    return this.http.put(url, plan, this.headers);
  }

  deletePlan(plan: number) {
    const url = `${baseUrl}/planes/destroy/${plan}`;
    return this.http.delete(url, this.headers);
  }

}
