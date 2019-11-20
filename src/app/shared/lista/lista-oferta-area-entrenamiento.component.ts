import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurarPagina } from 'src/app/core/models';

@Component({
    selector: 'area-entrenamiento-lista-oferta',
    templateUrl: './lista-oferta-area-entrenamiento.html',
    providers: [NgbTooltipConfig]
})
export class ListaOfertaAreaEntrenamientoComponent {
  @Input('idSeleccionado') public selId: number;
  @Input('ofertas') ofertas: any;
  @Input('configurarPaginacion') public configurarPagina: ConfigurarPagina;
  @Output('ofertaElegida') public ofertaElegida = new EventEmitter();
  @Output('cambioDePagina') public cambioDePagina = new EventEmitter();

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

  cambioPagina(page:number) {
    this.cambioDePagina.emit(page);
  }
}
