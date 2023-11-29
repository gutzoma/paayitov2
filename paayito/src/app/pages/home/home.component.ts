import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { HomeService } from '../../_services/home.service';

declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  content?: string;

  constructor(private authenticationService: AuthenticationService,
    private _homeservice: HomeService) { }

  ngOnInit(): void {
    this.getCartera();
  }

  getCartera() {
    const formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    })
    this._homeservice.getCartera().subscribe(
      response => {
        if (response != 'No existen') {

          $('.n-clientes').html(response[0].no_clientes);
          $('.n-prestamos').html(response[0].no_prestamos);
          $('.total-cartera').html(formatter.format(response[0].saldo_cartera));
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}