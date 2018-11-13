import { Component, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'area-entrenamiento-lista-destinatario',
    templateUrl: './lista-destinatario-area-entrenamiento.html',
    styleUrls: ['./lista-destinatario-area-entrenamiento.css'],
    providers: [NgbTooltipConfig]
})
export class ListaDestinatarioAreaEntrenamientoComponent {
    @Input('destinatarios') destinatarios: Object;
    //title = 'app';

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ) {
        config.placement = 'top';
        config.triggers = 'click';
    }

    limpiar(){
        console.log('limpiar campos');
    }


    getDireccion(lugar: Object) {
      let dir = "";
      dir += lugar['localidad'] + " - " + lugar['barrio'] + ' - ' + lugar['calle'] + ' ' + lugar['altura'];
      dir += (lugar['escalera'] != '') ? ' - ' + lugar['escalera'] : '';
      dir += (lugar['piso'] != '') ? ' - ' + lugar['piso'] : '';
      dir += (lugar['depto'] != '') ? ' - ' + lugar['depto'] : '';

      return dir;
  }
}
