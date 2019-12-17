import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    @Input("configPaginacion") public configPaginacion:any;
    @Output("cambioDePagina") public cambioDePagina = new EventEmitter();

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ){
        config.placement = 'top';
        config.triggers = 'click';
        config.autoClose = 'outside';
    }

    verDestinatario(id){
        this._router.navigate(['inicio','destinatario','vista', id ]);
    }

    editarDestinatario(id){
        this._router.navigate(['inicio', 'destinatario', 'editar', id]);
    }

    getDireccion(lugar: Object) {
        let dir = "";
        dir += (lugar['localidad'] != undefined) ? lugar['localidad'] + ' - ' : '';
        dir += lugar['calle'] + ' ' + lugar['altura'];
        dir += (lugar['barrio'] != '') ? " - " + lugar['barrio'] : '';
        dir += (lugar['escalera'] != '') ? ' - ' + lugar['escalera'] : '';
        dir += (lugar['piso'] != '') ? ' - ' + lugar['piso'] : '';
        dir += (lugar['depto'] != '') ? ' - ' + lugar['depto'] : '';

        return dir;
    }

    cambioPagina(page:number){
      this.cambioDePagina.emit(page);
    }

    nivelEducativo(estudio:any) {
      let texto = "N/A";
      if (estudio !== '') {
          texto = (estudio.nivel_educativo != '') ? estudio.nivel_educativo : "N/A";
          texto += (estudio.en_curso) ? " (En curso)" : "";
      }
      return texto;
    }

    tituloProfesion(estudio:any) {
      let texto = "N/A";
      if (estudio !== '') {
          texto = (estudio.profesion != '') ? estudio.profesion : "N/A";
          texto += (estudio.en_curso) ? " (En curso)" : "";
      }
      return texto;
    }

}
