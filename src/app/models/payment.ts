import { User } from "./user";
import { environment } from "src/environments/environment";

const base_url = environment.apiUrl;

export class Payment {
   id:number;
   user_id?:User;
   metodo?:string;
   bank_name?:string;
   monto:number;
   moneda_id?:number;
   moneda_codigo?:string;
   referencia?:string;
   imagen?:string;
   fecha?:Date;

   producto_id?:number;
   nombre?:User;
   email?:User;

   status?:string;
   validacion?:number;
  //  status:'Pendiente' | 'Aprobado' | 'Rechazado';

   updated_at:Date;
   created_at:Date;

   get imagenUrl(){

      if(!this.imagen){
        return `${base_url}/storage/directories/payments/no-image.jpg`;
      } else if(this.imagen.includes('https')){
        return this.imagen;
      } else if(this.imagen){
        return `${base_url}/storage/directories/payments/${this.imagen}`;
      }else {
        return `${base_url}/storage/directories/payments/no-image.jpg`;
      }

    }

}
