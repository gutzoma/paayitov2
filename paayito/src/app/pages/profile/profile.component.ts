import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../_services/profile.service';

declare let $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  public asesor!: any;
  public datos_agenda!: any;

  constructor(private _profileservice: ProfileService) { }

  ngOnInit(): void {
    this.asesor = JSON.parse(localStorage.getItem('userData')!);
    this.getCartera(this.asesor.id);
    this.getCarteraAgenda(this.asesor.id);
  }

  getCartera(id:any) {
    const formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    })
    this._profileservice.getCartera(id).subscribe(
      response => {
        if (response != 'No existen') {
          $('.n-prestamos').html(response[0].no_prestamos);
          $('.total-cartera').html(formatter.format(response[0].saldo_cartera));
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getCarteraAgenda(cliente: number) {
    this._profileservice.getCarteraAgenda(cliente).subscribe(
      response => {
        if (response != 'No existen') {
          
          this.datos_agenda = response;

        }else{
          this.datos_agenda = [{
            cliente_id: "NO",
            cuota: "HAY",
            fecha: "PAGOS",
            materno: "PENDIENTES",
            no_pago: "",
            nombres: "",
            paterno: "",
            prestamo_id: ""
          }]
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}