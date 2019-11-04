import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    /**
     * @var configPaginacion [object] configuracion de paginacion
     */
    @Input("configPaginacion") public configPaginacion:any;
    @Output("cambioDePagina") public cambioDePagina = new EventEmitter();

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ) {
        config.placement = 'top';
        config.triggers = 'click';
    }

    verAmbienteTrabajo(id) {
        this._router.navigate(['inicio','ambiente', 'vista', id]);
    }

    editarAmbienteTrabajo(id) {
        this._router.navigate(['inicio','ambiente','editar', id]);
    }

    agregarOfertas(id) {
        this._router.navigate(['inicio','ambiente', id, 'ofertas']);
    }

    getDireccion(lugar: Object) {
        let dir = "";
        dir += lugar['localidad'];
        dir += (lugar['barrio'] != '') ? " - Bº " + lugar['barrio'] : '';
        dir += ' - ' + lugar['calle'] + ' ' + lugar['altura'];
        dir += (lugar['escalera'] != '') ? ' - ' + lugar['escalera'] : '';
        dir += (lugar['piso'] != '') ? ' - ' + lugar['piso'] : '';
        dir += (lugar['depto'] != '') ? ' - ' + lugar['depto'] : '';
  
        return dir;
    }

    getTelefonos(telefono1:string, telefono2:string, telefono3:string) {
        
        let telefonos = '';
        telefonos += (telefono1)?telefono1:''; 
        telefonos += (telefono2)?' '+telefono2:''; 
        telefonos += (telefono3)?' '+telefono3:'';
        
        return telefonos;
    }

    cambioPagina(page:number){
        this.cambioDePagina.emit(page);
    }
}
