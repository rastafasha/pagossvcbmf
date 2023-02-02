import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.apiUrlMedia;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  image: string;
  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'users'|'payments'|'directories'|'plans',
    id: number
  ){

    try{debugger

      // const url = `${base_url}/${tipo}/update/${id}`;
      const url = `${base_url}${tipo}`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url,{
        method: 'PUT',
        headers: {
          'auth_token': localStorage.getItem('auth_token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      console.log(data.name);

      if(data.ok){
        console.log(data.name);
        console.log(archivo);
        return data.name;

      }else{
        console.log(archivo);
        console.log(data.msg);
        console.log(data);
        return false;

      }

    }catch(error){
      console.log(error);
      return false;
    }

  }

}
