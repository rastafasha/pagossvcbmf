import { environment } from "src/environments/environment";

const base_url = environment.apiUrl;
export class Plan {
  id: number;
  name: string;
  price: number;
  currency_id: number;
  image: string;
  status: string;
  created_at: string;
  updated_at: string;


  get imagenUrl(){

    if(!this.image){
      return `${base_url}/storage/directories/plans/no-image.jpg`;
    } else if(this.image.includes('https')){
      return this.image;
    } else if(this.image){
      return `${base_url}/storage/directories/plans/${this.image}`;
    }else {
      return `${base_url}/storage/directories/plans/no-image.jpg`;
    }

  }
}
