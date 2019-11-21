import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurarPagina } from 'src/app/core/models';
import { UtilService } from 'src/app/core/utils';

@Component({
    selector: 'area-entrenamiento-lista-oferta',
    templateUrl: './lista-oferta-area-entrenamiento.html',
    providers: [NgbTooltipConfig, UtilService]
})
export class ListaOfertaAreaEntrenamientoComponent {
  @Input('idSeleccionado') public selId: number;
  @Input('ofertas') ofertas: any;
  @Input('configurarPaginacion') public configurarPagina: ConfigurarPagina;
  @Output('ofertaElegida') public ofertaElegida = new EventEmitter();
  @Output('cambioDePagina') public cambioDePagina = new EventEmitter();
  @Output('buscar') public buscar = new EventEmitter();

  public global_param:string = "";
  public fecha_inicial: any = null;

  constructor(
      private _router: Router,
      private _utilService: UtilService,
      config: NgbTooltipConfig
  ) {
      config.placement = 'top';
      config.triggers = 'click';
  }
  /**
   * selecciona una oferta por id
   * @param id [number] identificador del id
   */
  seleccionarOferta(id:number) {
    if (this.selId != id) {
      this.selId = id;
      this.ofertaElegida.emit({ id:id });
    }else{
      this.selId = 0;
      this.ofertaElegida.emit(null);
    }

  }
  /**
   * cambio la pagina
   * @param page [number] numero de página
   */
  cambioPagina(page:number) {
    this.cambioDePagina.emit(page);
  }

  /**
   * Construyo el api que aplicara el filtrado del listado
   */
  realizarBusqueda(limpiar:boolean){
    let params:any = {};
    if (!limpiar){
      if (this.fecha_inicial !== null){
        Object.assign(params, { "fecha_inicial": this._utilService.formatObjetoAFecha(this.fecha_inicial) });
      }
      if (this.global_param !== "") {
        Object.assign(params, { "global_param": this.global_param });
      }

      this.buscar.emit(params);
    }else{
      this.global_param = "";
      this.fecha_inicial = null;
      this.buscar.emit({});
    }
  }
}
