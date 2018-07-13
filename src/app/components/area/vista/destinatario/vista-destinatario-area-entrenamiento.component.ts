import { Component, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'area-entrenamiento-vista-destinatario',
    templateUrl: './vista-destinatario-area-entrenamiento.html',
    styleUrls: ['./vista-destinatario-area-entrenamiento.css'],
    providers: [NgbTooltipConfig]
})
export class VistaDestinatarioAreaEntrenamientoComponent {
    @Input('destinatario') destinatario: Object;
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