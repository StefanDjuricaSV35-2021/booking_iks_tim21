
export class PieChartData{
  name:string;
  value:number;
  itemStyle:{color:string}

  constructor(name: string, value: number, color: string ) {
    this.name = name;
    this.value = value;
    this.itemStyle = {color:color}

  }
}


