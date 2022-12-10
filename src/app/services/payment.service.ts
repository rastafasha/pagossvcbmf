import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

import { Payment } from '@app/models/payment';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public pagos: Payment;

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

  getAll(): Observable<any> {
    const url = `${baseUrl}/pagos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, pagos: Payment}) => resp.pagos)
      )
  }

  get(id): Observable<any> {
    const url = `${baseUrl}/pagos/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, pago: Payment}) => resp.pago)
        );
  }

  create(data:Payment): Observable<any> {
    const url = `${baseUrl}/pagos/store`;
    return this.http.post(url, data, this.headers);
  }

  update(pago:Payment): Observable<any> {
   const url = `${baseUrl}/pagos/update/${pago.id}`;
    return this.http.put(url, pago, this.headers);
  }


  delete(id): Observable<any> {
    const url = `${baseUrl}/pagos/${id}`;
    return this.http.delete(url, this.headers);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByReference(title): Observable<any> {
    return this.http.get(`${baseUrl}/pagos/?title=${title}`);
  }

  getPagosbyUser(id:number): Observable<any> {

    const url = `${baseUrl}/pagos/pagosbyUser/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, pagos: Payment}) => resp.pagos)
        );
  }

   getRecientes(): Observable<any> {
    const url = `${baseUrl}/pagos/recientes`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, pagos: Payment}) => resp.pagos)
      )
  }

}
