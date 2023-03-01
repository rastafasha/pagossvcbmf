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
   image?:string;

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

      if(!this.image){
        return `${base_url}/payments/no-image.jpg`;
      } else if(this.image.includes('https')){
        return this.image;
      } else if(this.image){
        return `${base_url}/payments/${this.image}`;
      }else {
        return `${base_url}/payments/no-image.jpg`;
      }

    }

}
