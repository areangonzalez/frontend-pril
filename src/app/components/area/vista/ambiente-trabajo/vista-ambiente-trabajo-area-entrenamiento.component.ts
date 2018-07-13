import { Component, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'area-entrenamiento-vista-ambiente-trabajo',
    templateUrl: './vista-ambiente-trabajo-area-entrenamiento.html',
    styleUrls: ['./vista-ambiente-trabajo-area-entrenamiento.css'],
    providers: [NgbTooltipConfig]
})
export class VistaAmbienteTrabajoAreaEntrenamientoComponent {
    @Input('ambienteTrabajo') ambienteTrabajo: Object;
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