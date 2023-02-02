import { User } from "./user";
import { environment } from "src/environments/environment";

const base_url = environment.apiUrlMedia;

export class Payment {
   id:number;
   user_id?:User;
   metodo?:string;
   bank_name?:string;
   monto:string;
   moneda_id?:number;
   moneda_codigo?:string;
   referencia?:string;
   imagen?:string;

   fecha?:Date;

   plan_id?:number;
   nombre?:User;
   email?:User;

  //  status?:string;
  //  validacion?:string;
   validacion?:'APPROVED' | 'PENDING' | 'REJECTED';
   status?: 'APPROVED' | 'PENDING' | 'REJECTED';

   updated_at:Date;
   created_at:Date;

   get imagenUrl(){

      if(!this.imagen){
        return `${base_url}payments/no-image.jpg`;
      } else if(this.imagen.includes('https')){
        return this.imagen;
      } else if(this.imagen){
        return `${base_url}payments/${this.imagen}`;
      }else {
        // return `${base_url}payments/no-image.jpg`;
        return `./assets/img/no-image.jpg`;
      }

    }

}
export class PagoHecho {
  id: string;
  intent: string;
  status: string;
  purchase_units: Purchaseunit[];
  payer: Payer;
  create_time: string;
  update_time: string;
  links: Link[];
}

interface Link {
  href: string;
  rel: string;
  method: string;
}

interface Payer {
  name: Name2;
  email_address: string;
  payer_id: string;
  address: Address2;
}

interface Address2 {
  country_code: string;
}

interface Name2 {
  given_name: string;
  surname: string;
}

interface Purchaseunit {
  reference_id: string;
  amount: Amount;
  payee: Payee;
  description: string;
  soft_descriptor: string;
  items: Item[];
  shipping: Shipping;
  payments: Payments;
}

interface Payments {
  captures: Capture[];
}

interface Capture {
  id: string;
  status: string;
  amount: Itemtotal;
  final_capture: boolean;
  seller_protection: Sellerprotection;
  create_time: string;
  update_time: string;
}

interface Sellerprotection {
  status: string;
  dispute_categories: string[];
}

interface Shipping {
  name: Name;
  address: Address;
}

interface Address {
  address_line_1: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
}

interface Name {
  full_name: string;
}

interface Item {
  name: string;
  unit_amount: Itemtotal;
  tax: Itemtotal;
  quantity: string;
}

interface Payee {
  email_address: string;
  merchant_id: string;
}

interface Amount {
  currency_code: string;
  value: string;
  breakdown: Breakdown;
}

interface Breakdown {
  item_total: Itemtotal;
  shipping: Itemtotal;
  handling: Itemtotal;
  insurance: Itemtotal;
  shipping_discount: Itemtotal;
}

interface Itemtotal {
  currency_code: string;
  value: string;
}
