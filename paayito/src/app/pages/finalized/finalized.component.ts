import { Component } from '@angular/core';
import { Liquidaciones } from "../../_models/liquidaciones";
import { GeneralesService } from '../../_services/generales.service';

@Component({
  selector: 'app-finalized',
  templateUrl: './finalized.component.html',
  styles: [
  ],
  providers: [GeneralesService]
})

export class FinalizedComponent {
  public liquidaciones: Liquidaciones;
  public asesor!: any;

  constructor(private _generalesservice: GeneralesService) {
    this.liquidaciones = new Liquidaciones("", "", "");
  }

  ngOnInit(): void {}

  runLiquidacin(form: { reset: () => void }) {
    this.asesor = JSON.parse(localStorage.getItem("userData")!);
    this.asesor = this.asesor.id;
    this.liquidaciones.asesor = this.asesor;
    this._generalesservice.runLiquidacion(this.liquidaciones).subscribe(
      response => {
        if (response) {
          alert('Credito Liquidado');
          location.reload();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
