import { ProductPaypal } from './productPaypal';
import { Payment } from './payment';
import { Plan } from './plan';

export class CartItemModel {

    productId: number;
    productName: string;
    productPrice:number;
    description:string;
    quantity:number;

    constructor(plan: Plan){
      this.productId= 1;
      this.productName = 'Subcripcion';
      this.description = 'Esto es una subcripcion anual';
      this.productPrice = plan.price;
      this.quantity = 1;
    }

}

