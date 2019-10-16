import { Component } from '@angular/core';
import { trigger, transition, state, animate, style } from '@angular/animations';

@Component({
    selector: 'destinatario-busqueda',
    templateUrl: './busqueda-destinatario.html',
    styleUrls: ['./busqueda-destinatario.css'],
    animations: [
      trigger('abrirCerrar',[
        state('small', style({
          height : '0px',
        })),
        state('large', style({
          height : '160px',
        })),
        transition('small <=> large', animate('400ms ease-in')),
      ]),
    ]
})
export class BusquedaDestinatarioComponent {
    public isCollapsed = true;
    public state: string = 'small';

    constructor(){}

    abrirCerrarBusquedaAvanzada() {
      this.state = (this.state === 'small' ? 'large' : 'small');
    }



}
