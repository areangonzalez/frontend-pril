import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilService } from 'src/app/core/utils';
import { trigger, state, transition, animate, style } from '@angular/animations';


@Component({
    selector: 'ambiente-trabajo-busqueda',
    templateUrl: './busqueda-ambiente-trabajo.html',
    styleUrls: ['./busqueda-ambiente-trabajo.css'],
    providers: [UtilService],
    animations: [
        trigger('abrirCerrar',[
          state('small', style({
            height : '0px',
          })),
          state('large', style({
            height : '120px',
          })),
          transition('small <=> large', animate('400ms ease-in')),
        ]),
      ]
})
export class BusquedaAmbienteTrabajoComponent implements OnInit{
    @Output("obtenerBusqueda") obtenerBusqueda = new EventEmitter();
    @Output("limpiar") limpiar = new EventEmitter();
    public tipo_ambiente_trabajo_lista:any;
    public isCollapsed = true;
    public busquedaForm : FormGroup;
    public state: string = 'small';
    public btnSeleccion: boolean = false;
    public global_param: string = '';
    public tipo_ambiente_trabajoid: any = '';

    constructor(
        private _utilService: UtilService,
        private _router: Router,
        private _fb: FormBuilder,
        private _route: ActivatedRoute
    ) { 
       this.busquedaForm = _fb.group({           
           fechaDesde : '',
           fecha_desde : '',
           fechaHasta : '',
           fecha_hasta : '',
           estado : ''
       }) 
    }

    ngOnInit(){
        this.tipo_ambiente_trabajo_lista = this._route.snapshot.data['tipoAmbienteTrabajoLista'];
    }

    /**
     * abre/cierra con animación la busqueda avanzada
     */
    abrirCerrarBusquedaAvanzada() {
        this.state = (this.state === 'small' ? 'large' : 'small');
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
     * Convierte la fecha de objeto a string
     * @param fechaDesde [objeto] obtengo el objeto del ngbDate
     */
    obtenerFechaDesde(fechaDesde: any) {
        this.busquedaForm.get('fecha_desde').patchValue(this._utilService.formatObjetoAFecha(fechaDesde));
    }
    /**
     * Convierte la fecha de objeto a string
     * @param fechaHasta [objeto] obtengo el objeto del ngbDate
     */
    obtenerFechaHasta(fechaHasta: object) {
        this.busquedaForm.get('fecha_hasta').setValue(this._utilService.formatObjetoAFecha(fechaHasta));
    }
    /**
     * Limpiar los campos de busqueda
     */
    limpiarCampos() {

        //limpiamos variables del form
        let busqueda: any = this.busquedaForm.value;
        for (const key in busqueda) {
          if (key == 'fechaDesde') {
            busqueda[key] = null;
          }else if (key == 'fechaHasta') {
            busqueda[key] = null;
          }else {
            busqueda[key] = '';
          }
        }
        //limpiamos variables publicas
        this.tipo_ambiente_trabajoid = '';
        this.global_param = '';
        this.busquedaForm.patchValue(busqueda);
        this.btnSeleccion = false;
        this.state = 'small';
        this.limpiar.emit(true);
    }
    /**
     * Arma el array de busqueda para el API
     */
    realizarBusqueda() {
        let busquedaAvanzada = this.busquedaForm.value;
        let apiBusqueda:any = {};
        let esTrue: boolean = false;
        if (this.global_param != '') {
            Object.assign(apiBusqueda, {'global_param': this.global_param});
        }
        if (this.tipo_ambiente_trabajoid != '') {
            Object.assign(apiBusqueda, {'tipo_ambiente_trabajoid': this.tipo_ambiente_trabajoid});            
        }
        for (const clave in busquedaAvanzada) {
          if(busquedaAvanzada[clave] !== '' && busquedaAvanzada[clave] !== null && (busquedaAvanzada[clave])){
            if (clave != 'fechaDesde' && clave != 'fechaHasta'){
              Object.assign(apiBusqueda, {[clave]: busquedaAvanzada[clave]});
              esTrue = true;
            }
          }
        }
        this.btnSeleccion = esTrue;
        this.state = (esTrue) ? 'large' : 'small';
        this.obtenerBusqueda.emit(apiBusqueda);
    }
    
}