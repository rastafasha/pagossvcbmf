import { environment } from "src/environments/environment";

const base_url = environment.apiUrl;
export class Directorio {
    id: number;
    nombre: string;
    surname: string;
    especialidad: number;
    universidad: number;
    ano: string;
    org: string;
    website: string;
    email: string;
    direccion: string;
    direccion1: string;
    estado: string;
    ciudad: string;
    telefonos: string;
    tel1: string;
    telhome: string;
    telmovil: string;
    telprincipal: string;
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    vcard: string;
    created_at: Date;
    image:string;
    user_id:number;

    get imagenUrl(){

        if(!this.image){
          return `${base_url}/storage/directories/directory/no-image.jpg`;
        } else if(this.image.includes('https')){
          return this.image;
        } else if(this.image){
          return `${base_url}/storage/directories/directory/${this.image}`;
        }else {
          return `${base_url}/storage/directories/directory/no-image.jpg`;
        }

      }
}


