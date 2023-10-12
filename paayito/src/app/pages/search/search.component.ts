import { Component } from '@angular/core';
import { SearchService } from '../../_services/search.service';

declare let $: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ],
  providers: [SearchService]
})

export class SearchComponent {

  public clientes: any;
  public id_search: any;
  public clienteInfo: any;
  public pagos: any;
  public save_credito: any;
	public status!: string;
  public datos_credito!: any;

overlay = false;
public config!:any;

  constructor(
    private _searchservice: SearchService
  ) {
    this.id_search = '';
    this.config = {
      displayKey: "name",
      search: true,
      searchPlaceholder:'Bsucar Cliente',
      clearOnSelection: true
    };
  }
  ngOnInit(): void {
    this.getSearch();
    this.clienteInfo ={'nombres':'','materno':''}
    this.pagos ={}

  }

  onSelectionChange(event: any) {
    this.id_search = event.value.id;
    this.getCliente(this.id_search); 
    $('#showSearch').removeClass('disp-n');

  }

  getSearch() {
    var data = new Array();
    this._searchservice.getSearch().subscribe(
      response => {
        if (response != 'No existen') {
          response.forEach(function (cliente: any) {
            data.push({
              'id': cliente.cliente_id,
              'name': cliente.cliente_id + ' / ' + cliente.nombres + ' ' + cliente.paterno + ' ' + cliente.materno + ' / ' + cliente.curp
            });
          });
          this.clientes = data;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getCliente(cliente: number) {
    this._searchservice.getClienteSearch(cliente).subscribe(
      response => {
        if (response) {
          
          this.clienteInfo = response[0];
      var no_pagos = this.clienteInfo.pres_no_pagos;
      var cuota = this.clienteInfo.pres_cuota;  
      var pres_pagos_r = this.clienteInfo.pres_pagos_realizados;
      var pago;      
      var fecha_pag = this.clienteInfo.pres_fecha_ini;
      this.datos_credito = new Array();
          fecha_pag = fecha_pag.split("-");
          fecha_pag = new Date (fecha_pag[0], fecha_pag[1] -1, fecha_pag[2]);
          fecha_pag.setDate(fecha_pag.getDate());
      for (let i = 0; i < no_pagos; i++) {
        if(pres_pagos_r > i){
          pago = true;
        }else{
          pago = false;
        }
        this.datos_credito.push({
          'no': i+1,
          'cuota': Math.round(cuota),
          'fecha': fecha_pag.toLocaleDateString('es-MX'),
          'pago': pago
        });
        fecha_pag.setDate(fecha_pag.getDate() + 7);
      }
          setTimeout(() => {
            $("#showSearch").removeClass('disp_n');
          }, 300);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  printPage() {
    let printContents, popupWin;
    printContents = $('#agrrement-section').html();
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    if (popupWin) {
      popupWin.document.open();
      popupWin.document.write(`
				<html>
            <body onload="window.print();window.close()" style="font-size: 12px;">${printContents}</body>
        </html>
      `);
      popupWin.document.close();
    }
  }
}