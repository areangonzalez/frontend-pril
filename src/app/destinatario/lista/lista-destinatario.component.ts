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
    @Input('destinatarios') public destinatarios:any;
    @Input('totalFiltrado') public totalFiltrado:number;
    //title = 'app';

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ){
        config.placement = 'top';
        config.triggers = 'click';
    }

    verDestinatario(id){
        this._router.navigate(['destinatario/vista', id ]);
    }

    editarDestinatario(id){
        this._router.navigate(['destinatario/editar', id]);
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