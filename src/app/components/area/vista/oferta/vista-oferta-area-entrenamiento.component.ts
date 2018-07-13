import { Component, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'area-entrenamiento-vista-oferta',
    templateUrl: './vista-oferta-area-entrenamiento.html',
    styleUrls: ['./vista-oferta-area-entrenamiento.css'],
    providers: [NgbTooltipConfig]
})
export class VistaOfertaAreaEntrenamientoComponent {
    @Input('oferta') oferta: Object;
    //title = 'app';

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ) {
        config.placement = 'top';
        config.triggers = 'click';
    }

    /* limpiar() {
        console.log('limpiar campos');
    } */
}