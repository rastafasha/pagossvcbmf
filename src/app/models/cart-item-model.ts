import { Plan } from './plan';
export class CartItemModel {

    productId: number;
    productName: string;
    productPrice:number;
    description:string;
    quantity:number;
    category:string;

    constructor(product: Plan){
      this.productId= product.id;
      this.productName = product.name;
      this.category = 'Plan';
      this.description = 'Esto es una subcripcion';
      this.productPrice = product.price;
      this.quantity = 1;
    }

}

