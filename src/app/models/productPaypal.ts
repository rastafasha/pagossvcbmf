export class ProductPaypal {
  id: number;
  name:string;
  description: string;
  price:number;
  imageUrl: string;

  constructor(id, name, description, price, imageUrl,  ){
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}
