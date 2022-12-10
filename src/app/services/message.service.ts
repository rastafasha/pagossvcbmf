import { Injectable } from '@angular/core';
import { Payment } from '@app/models/payment';
import { Observable, Subject } from 'rxjs';
import { ProductPaypal } from '../models/productPaypal';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message = new Subject()

  constructor() { }

  sendMessage(pagoS: Payment):void{
    this.message.next(pagoS);
  }

  getMessage(): Observable<any>{
    return this.message.asObservable();
  }
}
