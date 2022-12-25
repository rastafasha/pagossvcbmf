import { Injectable } from '@angular/core';
import { Payment } from '@app/models/payment';
import { Observable, Subject } from 'rxjs';
import { ProductPaypal } from '../models/productPaypal';
import {Plan} from '@app/models/plan';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message = new Subject()

  constructor() { }

  sendMessage(plan: Plan):void{
    this.message.next(plan);
  }

  getMessage(): Observable<any>{
    return this.message.asObservable();
  }
}
