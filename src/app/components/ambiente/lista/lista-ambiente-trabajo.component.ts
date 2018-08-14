import { Component, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ambiente-trabajo-lista',
    templateUrl: './lista-ambiente-trabajo.html',
    styleUrls: ['./lista-ambiente-trabajo.css'],
    providers: [NgbTooltipConfig]
})
export class ListaAmbienteTrabajoComponent {
    @Input('ambientes') ambientes: Object;
    //title = 'app';

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ) {
        config.placement = 'top';
        config.triggers = 'click';
    }

    verAmbienteTrabajo(id) {
        this._router.navigate(['ambiente', 'vista']);
    }
}