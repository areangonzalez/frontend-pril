import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'area-entrenamiento-lista',
    templateUrl: './lista-area-entrenamiento.html',
    styleUrls: ['./lista-area-entrenamiento.css'],
    providers: [NgbTooltipConfig]
})
export class ListaAreaEntrenamientoComponent {
    @Input('areas') areas: any;
    @Input('totalFiltrado') public totalFiltrado:number;
    //title = 'app';

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ) {
        config.placement = 'top';
        config.triggers = 'click';
    }

    verAreaEntrenamiento(id) {
      console.log(id);
        this._router.navigate(['area-entrenamiento', 'vista', id]);
    }
}
