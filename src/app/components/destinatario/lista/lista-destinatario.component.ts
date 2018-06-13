import { Component, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'destinatario-lista',
    templateUrl: './lista-destinatario.component.html',
    styleUrls: ['./lista-destinatario.component.css'],
    providers: [NgbTooltipConfig]
})
export class ListaDestinatarioComponent {
    @Input('destinatarios') destinatarios:Object;
    //title = 'app';

    constructor(config: NgbTooltipConfig){
        config.placement = 'top';
        config.triggers = 'click';
    }
}