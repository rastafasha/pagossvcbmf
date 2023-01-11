
import { Member } from "./member";
import { Role } from "./role";
import { Directorio } from "./directorio";
import { Payment } from "./payment";
import { environment } from "@environments/environment";
const base_url = environment.apiUrlMedia;
export class User {

    id: number = 0;
    // role_id: number = 3; // 3 = Rol miembro
    username: string = "";
    email: string = "";
    password?: string = "";
    first_name: string = "";
    last_name: string = "";
    token: string = "";
    is_active: number = 0;
    created_at: string = "";
    image: string = "";
    role?: 'SUPERADMIN' | 'ADMIN' | 'MEMBER' | 'GUEST';
    member?: Member;
    directories: Directorio;
    payments: Payment;



    public get isActive():boolean{
        return (this.is_active === 1 ? true: false);
    }


    get imagenUrl(){

      if(!this.image){
        return `${base_url}users/no-image.jpg`;
      } else if(this.image.includes('https')){
        return this.image;
      } else if(this.image){
        return `${base_url}users/${this.image}`;
      }else {
        return `${base_url}users/no-image.jpg`;
      }

    }

}
