
export class AccommodationAnnualDataDTO {
  name:string;
  profit:number[];
  reservations:number[]

  constructor(name: string, profit: number[], reservations: number[]) {
    this.name = name;
    this.profit = profit;
    this.reservations = reservations;
  }

}
