import {Component} from '@angular/core';
import type {ECharts, EChartsOption} from 'echarts';
import {PieChartData} from "../../../../core/models/PieChartData";
import {OwnerAnalyticsService} from "../../../../core/services/owner-analytics/owner-analytics.service";
import {formatDate} from "@angular/common";
import {AccommodationProfitDTO} from "../../../../core/models/AccommodationProfitDTO";
import {AccommodationReservationCountDTO} from "../../../../core/models/AccommodationReservationCountDTO";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


@Component({
  selector: 'app-daterange-report',
  templateUrl: './daterange-report.component.html',
  styleUrls: ['./daterange-report.component.css']
})
export class DaterangeReportComponent {

  dateFrom:string;
  dateTo:string;

  profitData:PieChartData[]|[]=[]
  reservationData:PieChartData[]|[]=[]

  profitChart: ECharts;
  profitChartOptions=this.generateOptions(this.profitData,"Profit")

  reservationChart:ECharts
  reservationChartOptions=this.generateOptions(this.reservationData,"Reservations")

  constructor(
    private analyticsService:OwnerAnalyticsService
  ) {}

  ngOnInit(): void {
  }


  onResChartInit(e: ECharts) {
    this.reservationChart = e;
    e.setOption(this.reservationChartOptions)
  }

  onProfitChartInit(e: ECharts) {
    this.profitChart = e;
    e.setOption(this.profitChartOptions)
  }

  generateOptions(data:PieChartData[],name:string){
    let options: EChartsOption = {
      title: {
        text: name,
        left: 'center',
        top: 20,
        textStyle: {
          color: '#082c3c',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series:
        {
          name: 'Accommodation',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: data,
          roseType: 'radius',
          label: {
            color: 'black',
          },
          labelLine: {
            show: true, // Show label lines for pie chart

            lineStyle: {
              color: 'black',
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: () => Math.random() * 200,
        },
    };

    return options;
  }

  getRandomColor(brightness){
    function randomChannel(brightness){
      var r = 255-brightness;
      var n = 0|((Math.random() * r) + brightness);
      var s = n.toString(16);
      return (s.length==1) ? '0'+s : s;
    }
    return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
  }

  datesChanged(startDateVal: HTMLInputElement, endDateVal: HTMLInputElement) {

    let dateFrom=new Date(new Date(startDateVal.value).setHours(0,0,0,0));
    let dateTo=new Date(new Date(endDateVal.value).setHours(0,0,0,0));

    if(dateTo>dateFrom){

      this.getNewData(dateFrom,dateTo)

    }else{
      this.reservationData=[];
      this.profitData=[]
      this.refreshCharts()
    }

  }

  getNewData(dateFrom:Date, dateTo:Date){

    let dateFromFormatted = formatDate(
      dateFrom,
      'yyyy-MM-dd',
      'en_US'
    );
    let dateToFormatted = formatDate(
      dateTo,
      'yyyy-MM-dd',
      'en_US'
    );
    let ownerId=3;

    this.dateFrom=dateFromFormatted;
    this.dateTo=dateToFormatted;

    this.analyticsService.getAccommodationsProfit(ownerId,dateFromFormatted,dateToFormatted).subscribe((data) => {
      let profitData=data;


      this.analyticsService.getAccommodationReservationCount(ownerId,dateFromFormatted,dateToFormatted).subscribe((data) => {
        console.log(data);

        this.setData(profitData,data);

      });

    });

  }

  setData(profitData:AccommodationProfitDTO[],resCountData:AccommodationReservationCountDTO[]){

    let colors = new Map<string, string>();
    let profits:PieChartData[]=[];
    let res:PieChartData[]=[];


    for (const d of profitData) {
      let color = this.getRandomColor(50)
      profits.push(new PieChartData(d.name, d.profit,color))
      colors.set(d.name,color)

    }

    for (const d of resCountData) {
      res.push(new PieChartData(d.name, d.count,colors.get(d.name)!));
    }

    this.profitData=profits;
    this.reservationData=res;

    this.refreshCharts();

  }

  refreshCharts(){
    this.profitChart.setOption(this.generateOptions(this.profitData,"Profit"))
    this.reservationChart.setOption(this.generateOptions(this.reservationData,"Reservations"))

  }

  exportToPdf() {
    html2canvas(document.getElementById('chartContainer') as HTMLDivElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Create a PDF document
      const pdf = new jsPDF();

      const pageWidth:number=pdf.internal.pageSize.width;


      const imgHeight = 80; // You can adjust the width as needed
      const imgWidth = (canvas.width * imgHeight) / canvas.height;

      const widthDiff=pageWidth-imgWidth;

      const margLeft=widthDiff/2;

      pdf.addImage(imgData, 'PNG', margLeft, 10, imgWidth, imgHeight,'center');

      // Add a table with data using autoTable from the jspdf-autotable plugin
      const tableData = [['Accommodation', 'Profit', 'Reservations']];
      for (let i = 0; i < this.profitData.length; i++) {
        tableData.push([this.profitData[i].name, this.profitData[i].value.toString(), this.reservationData[i].value.toString()]);
      }

      autoTable(pdf,{
        head: [tableData[0]],
        body: tableData.slice(1),
        startY: imgHeight + 20, // Adjust the starting position of the table
      });

      // Save the PDF or open in a new tab
      pdf.save('accommodations-daterange_data.pdf');
    });
  }

}

