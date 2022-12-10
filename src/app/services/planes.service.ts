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


  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'token': this.token
      }
    }
  }


  getPlanes() {
    const url = `${baseUrl}/planes`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, plans: Plan}) => resp.plans)
      )
  }

  getPlan(plan: any) {
    const url = `${baseUrl}/plan/show/${plan}`;
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
