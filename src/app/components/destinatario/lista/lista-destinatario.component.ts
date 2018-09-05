import { Component, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'destinatario-lista',
    templateUrl: './lista-destinatario.html',
    styleUrls: ['./lista-destinatario.css'],
    providers: [NgbTooltipConfig]
})
export class ListaDestinatarioComponent {
    @Input('destinatarios') destinatarios:Object;
    //title = 'app';

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ){
        config.placement = 'top';
        config.triggers = 'click';
    }

    verDestinatario(id){
        this._router.navigate(['destinatario', 'vista']);
    }

    editarDestinatario(id){
        this._router.navigate(['destinatario', 'editar', id]);
    }
}