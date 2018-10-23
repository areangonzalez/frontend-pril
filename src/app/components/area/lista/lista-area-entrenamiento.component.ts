import { Component, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'area-entrenamiento-lista',
    templateUrl: './lista-area-entrenamiento.html',
    styleUrls: ['./lista-area-entrenamiento.css'],
    providers: [NgbTooltipConfig]
})
export class ListaAreaEntrenamientoComponent {
    @Input('areas') areas: Object;
    //title = 'app';

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ) {
        config.placement = 'top';
        config.triggers = 'click';
    }

    verAreaEntrenamiento(id) {
        this._router.navigate(['area', 'vista']);
    }
}