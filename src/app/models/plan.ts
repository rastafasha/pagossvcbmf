import { environment } from "src/environments/environment";
import { Currencies } from './currencies';

const base_url = environment.apiUrlMedia;
export class Plan {
  id: number;
  name: string;
  // description: string;
  // category:string;
  price: number;
  image: string;
  currency_id: number ;
  // status: string ;
  created_at: string;
  updated_at: string;


  status?: 'APPROVED' | 'PENDING' | 'REJECTED';

  constructor(id, name, price, image,  ){
    this.id = id;
    this.name = name;
    // this.description = description;
    // this.category = category;
    this.price = price;
    this.image = image;
  }


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
