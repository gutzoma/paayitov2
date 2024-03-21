import { Component } from '@angular/core';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { GeneralesService } from '../../_services/generales.service';
import { ReportsService } from '../../_services/reports.service';
import { Report } from '../../_models/report';

declare let $: any;

export const PICK_FORMATS = {
  parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
  display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'short'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};
class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
      if (displayFormat === 'input') {
          return formatDate(date,'dd-MM-yyyy',this.locale);;
      } else {
          return date.toDateString();
      }
  }
}
@Component({
  selector: 'app-report-cashbox',
  templateUrl: './report-cashbox.component.html',
  styles: [
  ],
  providers: [GeneralesService, ReportsService,
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}]
})

export class ReportCashboxComponent {

  public report: Report;
  public reportInfo!: any;
  public t_ofi: any;
  public t_cam: any;
  public t_gen: any;

  constructor(private _generalesservice: GeneralesService, private _reportsservice: ReportsService) {
    
    this.report = new Report('', '', '', '');
    this.t_ofi =  0;
    this.t_cam =  0;
    this.t_gen =  0;
   }

   date : any;

   ngOnInit(): void {

   }


  getReportCashBox(form: { reset: () => void; }){
    if($("input[name=f_inicial]").val() == '' || $("input[name=f_final]").val() == '') {
     alert('ingresa fechas validas')
    }else{
      var f_inicial:any = $("input[name=f_inicial]").val();
      f_inicial = f_inicial.split("-");
      this.report.f_inicial = f_inicial[2]+'-'+f_inicial[1]+'-'+f_inicial[0];
      var f_final:any = $("input[name=f_final]").val();
      f_final = f_final.split("-");
      this.report.f_final = f_final[2]+'-'+f_final[1]+'-'+f_final[0];
      this._reportsservice.getReportCashBox(this.report).subscribe(
        response => {
          if(response == 'No existen'){
            this.reportInfo = [{'cliente_id': 'No hay datos'}];
          }else{
            this.reportInfo = response;

            var ofi = 0;
            var cam = 0;
            var gen = 0;

            this.reportInfo.forEach( (element: any) => {
              if(element.lugar == "Oficina"){
                ofi += parseFloat(element.cantidad);
              }else{
                cam += parseFloat(element.cantidad);
              }
            });

            this.t_ofi = this.moneda(ofi);
            this.t_cam = this.moneda(cam);
            this.t_gen = this.moneda(ofi + cam);
          }
          $(".totales").css("display", "inherit");
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  printPage() {


    let printContents, popupWin;
    printContents = $('#agrrement-section3').html();
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    if (popupWin) {
      popupWin.document.open();
      popupWin.document.write(`
				<html>
            <body onload="window.print();window.close()" style="font-size: 13px;">${printContents}</body>
        </html>
      `);
      popupWin.document.close();
    }
  }

  moneda(dato: any) {
    let num: any;
    num = Math.round(dato);

    if (!isNaN(num)) {
      num = num
        .toString()
        .split("")
        .reverse()
        .join("")
        .replace(/(?=\d*\.?)(\d{3})/g, "$1,");

      num = num.split("").reverse().join("").replace(/^[\,]/, "");

      return (dato = "$" + num);
    }
    return num;
  }
}