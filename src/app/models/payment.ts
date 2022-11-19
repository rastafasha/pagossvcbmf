export class Payment {
   id:number;
   user_id:number;
   producto_id:number;
   referencia:string;
   metodo:string;
   bank_name:string;
   monto:number;
   validacion:number;
   moneda_id:number;
   moneda_codigo:string;
   nombre:string;
   email:string;
   status:string;
  //  status:'Pendiente' | 'Aprobado' | 'Rechazado';
   txn_id:string;
   updated_at:Date;
   created_at:Date;

}
