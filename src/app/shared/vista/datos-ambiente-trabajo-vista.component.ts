
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'datos-ambiente-trabajo-vista',
    templateUrl: './datos-ambiente-trabajo-vista.component.html',
    // styleUrls: ['./ambiente-vista.component.css'],
    providers: [NgbTooltipConfig]
})
export class DatosAmbienteTrabajoVistaComponent {
    @Input("ambiente") public ambiente:any;

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ) {
        config.placement = 'top';
        config.triggers = 'click';
    }
}