export class Product {
  public id: Number;
  public name: String;
  public description: String;
  public price: Number;
  public quantity: Number;

  constructor(
    id: Number,
    name: String,
    description: String,
    price: Number,
    quantity: Number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }
}

export interface Pagination {
  metadata: any;
  products: Product[];
}
