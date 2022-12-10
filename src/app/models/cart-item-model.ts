import { ProductPaypal } from './productPaypal';
import { Payment } from './payment';

export class CartItemModel {

    productId: number;
    productName: string;
    productPrice:number;
    description:string;
    quantity:number;

    constructor(product: Payment){
      this.productId= 1;
      this.productName = 'Subcripcion';
      this.description = 'Esto es una subcripcion anual';
      this.productPrice = product.monto;
      this.quantity = 1;
    }

}

