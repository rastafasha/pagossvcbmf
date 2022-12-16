import { Injectable } from '@angular/core';
import { CartItemModel } from '../models/cart-item-model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private linktTheme = document.querySelector('.dark');// se comunica el id pulsado


  constructor() {

   }





  existCart():boolean{
    return localStorage.getItem('pago') != null;
  }

  setCart(cart: CartItemModel[]): void{
    localStorage.setItem('pago', JSON.stringify(cart));
  }

  getCart(): CartItemModel[]{
    return JSON.parse(localStorage.getItem('pago'));

  }
  clear():void{
    localStorage.removeItem('pago');
  }


}
