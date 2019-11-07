import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/core/utils';

@Component({
    selector: 'ambiente-trabajo-busqueda',
    templateUrl: './busqueda-ambiente-trabajo.html',
    styleUrls: ['./busqueda-ambiente-trabajo.css'],
    providers: [UtilService]
})
export class BusquedaAmbienteTrabajoComponent implements OnInit{
    @Output("obtenerBusqueda") obtenerBusqueda = new EventEmitter();
    @Output("limpiar") limpiar = new EventEmitter();
    public tipo_ambiente_trabajo_lista:any;
    public localidad_lista:any;
    public btnSeleccion: boolean = false;
    public global_param: string = '';
    public tipo_ambiente_trabajoid: any = '';
    public localidadid: any = '';

    constructor(
        private _utilService: UtilService,
        private _router: Router,
        private _route: ActivatedRoute
    ){}

    ngOnInit(){
        this.tipo_ambiente_trabajo_lista = this._route.snapshot.data['tipoAmbienteTrabajoLista'];
        this.localidad_lista = this._route.snapshot.data['localidadLista'];
    }

    /**
     * Se marcan los campos utilizados en la búsqueda avanzada
     * @param valor [any] contiene el valor de la variable
     * @return [boolean] devuelve el valor a marcar en booleano
     */
    marcarCampo(valor:any) {
        let marcar: boolean = false;
        marcar = (valor != null && valor != '') ? true : false;
        return marcar;
    }

    /**
     * Limpiar los campos de busqueda
     */
    limpiarCampos() {
        //limpiamos variables publicas
        this.tipo_ambiente_trabajoid = '';
        this.localidadid = '';
        this.global_param = '';
        this.btnSeleccion = false;
        this.limpiar.emit(true);
    }
    /**
     * Arma el array de busqueda para el API
     */
    realizarBusqueda() {
        // let busquedaAvanzada = this.busquedaForm.value;
        let apiBusqueda:any = {};
        let esTrue: boolean = false;

        //Se agrupan los parametros de búsqueda a apiBusqueda
        if (this.global_param != '') {
            Object.assign(apiBusqueda, {'global_param': this.global_param});
        }
        if (this.tipo_ambiente_trabajoid != '') {
            Object.assign(apiBusqueda, {'tipo_ambiente_trabajoid': this.tipo_ambiente_trabajoid});            
        }     
        if (this.localidadid != '') {
            Object.assign(apiBusqueda, {'localidadid': this.localidadid});            
        }    
        
        this.btnSeleccion = esTrue;
        this.obtenerBusqueda.emit(apiBusqueda);
    }
    
}