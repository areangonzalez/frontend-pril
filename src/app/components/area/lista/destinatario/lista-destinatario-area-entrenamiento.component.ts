import { Component, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'area-entrenamiento-lista-destinatario',
    templateUrl: './lista-destinatario-area-entrenamiento.html',
    //styleUrls: ['./lista-area-entrenamiento.css'],
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
}