
import { Member } from "./member";
import { Role } from "./role";
import { Directorio } from "./directorio";
import { Payment } from "./payment";

export class User {

    id: number = 0;
    role_id: number = 3; // 3 = Rol miembro
    username: string = "";
    email: string = "";
    password?: string = "";
    first_name: string = "";
    last_name: string = "";
    token: string = "";
    is_active: number = 0;
    created_at: string = "";
    image: string = "";
    role?: Role;
    member?: Member;
    directorios: Directorio;
    pagos: Payment;

    constructor(id: number, username: string, email: string, password: string, first_name: string, last_name: string, token: string, is_active: number, created_at: string, image: string, role_id: number, role?:Role, member?:Member) { }

    public get roleName():string{
      return this.role? this.roleName : 'Visitante';

    }

    public get isActive():boolean{
        return (this.is_active === 1 ? true: false);
    }

}