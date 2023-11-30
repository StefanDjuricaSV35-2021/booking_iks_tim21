

export class Accomodation {
  _id: number | undefined;
  name: string | undefined;
  description: string| undefined;
  location: string| undefined;
  price: number| undefined;

  constructor(id: number | undefined, name: string | undefined, description: string | undefined, location: string | undefined, price: number | undefined) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.location = location;
    this.price = price;
  }

;
}
