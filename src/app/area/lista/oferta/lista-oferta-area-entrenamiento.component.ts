import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'area-entrenamiento-lista-oferta',
    templateUrl: './lista-oferta-area-entrenamiento.html',
    //styleUrls: ['./lista-area-entrenamiento.css'],
    providers: [NgbTooltipConfig]
})
export class ListaOfertaAreaEntrenamientoComponent {
    @Input('ofertas') ofertas: Object;
    @Input('totalFiltrado') public totalFiltrado: number;
    @Output('ofertaElegida') public ofertaElegida = new EventEmitter();
    public selId = 0;
    public pagina: number = 1;

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ) {
        config.placement = 'top';
        config.triggers = 'click';
    }

    limpiar() {
        console.log('limpiar campos');
    }

    seleccionarOferta(id) {
      if (this.selId != id) {
        this.selId = id;
        this.ofertaElegida.emit({ id:id });
      }else{
        this.selId = 0;
        this.ofertaElegida.emit(null);
      }

    }
}
