import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurarPagina } from '../../core/models';

@Component({
    selector: 'area-entrenamiento-lista-destinatario',
    templateUrl: './lista-destinatario-area-entrenamiento.html',
    styleUrls: ['./lista-destinatario-area-entrenamiento.css'],
    providers: [NgbTooltipConfig]
})
export class ListaDestinatarioAreaEntrenamientoComponent {
    @Input('destinatarios') destinatarios: any;
    @Input('configurarPaginacion') public configurarPaginacion: ConfigurarPagina;
    @Input("idSeleccionado") public selId: number;
    @Output("cambioDePagina") public cambioDePagina = new EventEmitter();
    @Output('destinatarioElegido') destinatarioElegido = new EventEmitter();
    @Output("buscar") public buscar = new EventEmitter();

    public global_param: string = "";

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ) {
        config.placement = 'top';
    }
    /**
     * Genera un string concatenando los datos de una direccion de una persona
     * @param lugar [object] objeto que contiene los datos de direccion
     */
    getDireccion(lugar: Object) {
      let dir = "";
      dir += lugar['localidad'] + " - " + lugar['barrio'] + ' - ' + lugar['calle'] + ' ' + lugar['altura'];
      dir += (lugar['escalera'] != '') ? ' - ' + lugar['escalera'] : '';
      dir += (lugar['piso'] != '') ? ' - ' + lugar['piso'] : '';
      dir += (lugar['depto'] != '') ? ' - ' + lugar['depto'] : '';

      return dir;
    }
    /**
     * selecciona un destinatario del listado
     * @param id [nummber] identificador del destinatario
     * @param formacionDeseada [string] formacion deseada del destinatario
     * @param lista_oficio [Array] listado de oficios que contiene un destinatario
     */
    seleccionarDestinatario(id:number, formacionDeseada:string, lista_oficio:any){
      if (this.selId != id) {
        this.selId = id;
        this.destinatarioElegido.emit({ id:id, deseo_actividad: formacionDeseada, lista_oficio: lista_oficio });
      }else{
        this.selId = 0;
        this.destinatarioElegido.emit(null);
      }

    }
    /**
     * Envia la página seleccionada al componente padre
     * @param page numero de página
     */
    cambioPagina(page:number){
      this.cambioDePagina.emit(page);
    }
    /**
     * Construyo el api que aplicara el filtrado del listado
     */
    realizarBusqueda(limpiar:boolean){
      if (!limpiar){
        this.buscar.emit({ "global_param": this.global_param });
      }else{
        this.global_param = "";
        this.buscar.emit({});
      }
    }
}
