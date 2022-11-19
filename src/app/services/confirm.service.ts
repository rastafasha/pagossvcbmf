import { Injectable } from '@angular/core';
import { Subject, Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  private subject = new Subject<any>();
  

  constructor() { }

  openConfirmDialog(message:string, title:string, fun?:() => void, uid?:string, that?:any){
    return this.setMessage(message, title, fun,uid,that);
  }

  

  getMessage(): Observable<any> {  
    return this.subject.asObservable();  
  } 

  setMessage(message:string, title:string, fun?:() => void, uid?:string, that?:any): void  { 
    this.subject.next({  
      type: 'confirm',  
      message: message,
      title: title,
      fun: fun,
      uid: uid,
      that: that
    }); 
      
  }  
}
