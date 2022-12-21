import { environment } from "src/environments/environment";

const base_url = environment.apiUrlMedia;
export class Plan {
  id: number;
  name: string;
  price: number;
  currency_id: number;
  image: string;
  status: string ;
  created_at: string;
  updated_at: string;


  get imagenUrl(){

    if(!this.image){
      return `${base_url}plans/no-image.jpg`;
    } else if(this.image.includes('https')){
      return this.image;
    } else if(this.image){
      return `${base_url}plans/${this.image}`;
    }else {
      return `${base_url}plans/no-image.jpg`;
    }

  }
}

// const PUBLISHED = 'PUBLISHED';
//     const PENDING = 'PENDING';
//     const REJECTED = 'REJECTED';
