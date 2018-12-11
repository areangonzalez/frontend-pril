import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'area-entrenamiento-lista-destinatario',
    templateUrl: './lista-destinatario-area-entrenamiento.html',
    styleUrls: ['./lista-destinatario-area-entrenamiento.css'],
    providers: [NgbTooltipConfig]
})
export class ListaDestinatarioAreaEntrenamientoComponent {
    @Input('destinatarios') destinatarios: Object;
    @Input('totalFiltrado') public totalFiltrado: number;
    @Output('destinatarioElegido') destinatarioElegido = new EventEmitter();

    public pagina = 0;
    public selId = 0;

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


    getDireccion(lugar: Object) {
      let dir = "";
      dir += lugar['localidad'] + " - " + lugar['barrio'] + ' - ' + lugar['calle'] + ' ' + lugar['altura'];
      dir += (lugar['escalera'] != '') ? ' - ' + lugar['escalera'] : '';
      dir += (lugar['piso'] != '') ? ' - ' + lugar['piso'] : '';
      dir += (lugar['depto'] != '') ? ' - ' + lugar['depto'] : '';

      return dir;
    }

    seleccionarDestinatario(id:number, formacionDeseada:string, oficio:string){
      if (this.selId != id) {
        this.selId = id;
        this.destinatarioElegido.emit({ id:id, deseo_actividad: formacionDeseada, oficio:oficio });
      }else{
        this.selId = 0;
        this.destinatarioElegido.emit(null);
      }

    }
}
