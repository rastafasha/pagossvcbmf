import { User } from "./user";

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

}
