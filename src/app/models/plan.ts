import { environment } from "src/environments/environment";
import { Currencies } from './currencies';

const base_url = environment.apiUrlMedia;
export class Plan {
  id: number;
  name: string;
  price: number;
  image: string;
  currency_id: number ;
  created_at: string;
  updated_at: string;
  status?: 'APPROVED' | 'PENDING' | 'REJECTED';
  // description: string;
  // category:string;



  constructor(id, name, price, image,  ){
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    // this.description = description;
    // this.category = category;
  }


  get imagenUrl(){

    if(!this.image){
      return `${base_url}/plans/no-image.jpg`;
    } else if(this.image.includes('https')){
      return this.image;
    } else if(this.image){
      return `${base_url}/plans/${this.image}`;
    }else {
      return `${base_url}/no-image.jpg`;
    }

  }
}

// const PUBLISHED = 'PUBLISHED';
//     const PENDING = 'PENDING';
//     const REJECTED = 'REJECTED';
