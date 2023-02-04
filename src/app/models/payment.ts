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
