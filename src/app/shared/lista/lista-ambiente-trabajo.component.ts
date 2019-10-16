import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ambiente-trabajo-lista',
    templateUrl: './lista-ambiente-trabajo.html',
    styleUrls: ['./lista-ambiente-trabajo.css'],
    providers: [NgbTooltipConfig]
})
export class ListaAmbienteTrabajoComponent {
    @Input('ambientes') ambientes: any;
    @Input('totalFiltrado') public totalFiltrado:number;

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ) {
        config.placement = 'top';
        config.triggers = 'click';
    }

    verAmbienteTrabajo(id) {
        this._router.navigate(['ambiente', 'vista', id]);
    }

    editarAmbienteTrabajo(id) {
        this._router.navigate(['ambiente/editar', id]);
    }

    agregarOfertas(id) {
        this._router.navigate(['ambiente', id, 'ofertas']);
    }
}
