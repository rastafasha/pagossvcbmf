import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.apiUrlMedia;

@Pipe({
  name: 'imagenPipe'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'users'|'payments'|'directories'|'plans'): string {

    if(!img){
      return `${base_url}no-image.jpg`;
    } else if(img.includes('https')){
      return img;
    } else if(img){
      return `${base_url}${tipo}/${img}`;
    }else {
      return `${base_url}no-image.jpg`;
    }


  }

}
