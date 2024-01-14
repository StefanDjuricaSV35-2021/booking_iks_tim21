import {Component, signal} from '@angular/core';
import * as echarts from 'echarts';
import {ECharts, EChartsOption} from "echarts";
import {AccommodationAnnualDataDTO} from "../../../../core/models/AccommodationAnnualDataDTO";
import {OwnerAnalyticsService} from "../../../../core/services/owner-analytics/owner-analytics.service";
import {AccommodationPreviewDTO} from "../../../../core/models/accommodationPreviewDTO";
import {
  AccommodationPreviewService
} from "../../../../core/services/accommodation-preview/accommodation-preview.service";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {fontSize} from "html2canvas/dist/types/css/property-descriptors/font-size";



@Component({
  selector: 'app-yearly-report',
  templateUrl: './yearly-report.component.html',
  styleUrls: ['./yearly-report.component.css']
})
export class YearlyReportComponent {

  year:number;
  accId:number;
  months: string[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  currentProfits:number[];
  currentResCount:number[];
  currentAccName:string;

  accessor accOptions:AccommodationPreviewDTO[]
  annualChart:ECharts;
  annualChartOptions=this.getOptions("Accommodation",[],[])

  constructor(
    private analyticsService:OwnerAnalyticsService,
    private accPrevService:AccommodationPreviewService

) {}

  ngOnInit(){

    this.accPrevService.findAllForOwner(3).subscribe((data) => {
      this.accOptions=data;
    });
  }

  getOptions(name:string,profits:number[],reservations:number[]){


    let options: EChartsOption = {
      title: {
        text: name+' Annual Data ',
        left:"center"
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top:"30px",
        data: ['Profit', 'Reservations']
      },
      xAxis: {
        type: 'category',
        data: this.months
      },
      yAxis: [
        {
          type: 'value',
          name: 'Profit',
          min: 0,
          max: Math.max(...profits) + 200,
          position: 'left',
          axisLabel: {
            formatter: '{value} $'
          }
        },
        {
          type: 'value',
          name: 'Reservations',
          min: 0,
          max: Math.max(...reservations) + 10,
          position: 'right',
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: [
        {
          name: 'Profit',
          type: 'bar',
          data: profits,
          color:"#14213d",
          barWidth: "30px", // Set custom bar width

        },
        {
          name: 'Reservations',
          type: 'line',
          yAxisIndex: 1,
          data: reservations,
          color:"#fca311"
        }
      ]
    };

    return options;

  }

  onAnnualChartInit(e: ECharts) {
    this.annualChart=e;
    //this.annualChart.getDataURL({type:"png"})
  }

  updateData() {

    if(this.year==undefined||this.accId==undefined){
      return
    }

    this.analyticsService.getAccommodationAnnualData(this.accId,this.year).subscribe((data) => {
      console.log(data.reservations)
      this.currentAccName=data.name;
      this.currentProfits=data.profit;
      this.currentResCount=data.reservations;
      this.annualChartOptions=this.getOptions(data.name,data.profit,data.reservations);
    });

  }

  exportToPdf() {
    html2canvas(document.getElementById('chartContainerYear') as HTMLDivElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Create a PDF document
      const pdf = new jsPDF();
      const imgWidth = 190; // You can adjust the width as needed
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

      // Add a table with data using autoTable from the jspdf-autotable plugin
      const tableData = [['Month', 'Profit', 'Reservations']];
      for (let i = 0; i < this.months.length; i++) {
        tableData.push([this.months[i], this.currentProfits[i].toString(), this.currentResCount[i].toString()]);
      }

      autoTable(pdf,{
        head: [tableData[0]],
        body: tableData.slice(1),
        startY: imgHeight + 20, // Adjust the starting position of the table
      });

      // Save the PDF or open in a new tab
      pdf.save(this.currentAccName.replace(" ","_")+'_annual_data.pdf');
    });
  }
}
