import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { trigger, transition, state, animate, style } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilService } from '../../../core/utils'
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'destinatario-busqueda',
    templateUrl: './busqueda-destinatario.html',
    styleUrls: ['./busqueda-destinatario.css'],
    providers: [UtilService],
    animations: [
      trigger('abrirCerrar',[
        state('small', style({
          height : '0px',
        })),
        state('large', style({
          height : '160px',
        })),
        transition('small <=> large', animate('400ms ease-in')),
      ]),
    ]
})
export class BusquedaDestinatarioComponent implements OnInit {
    @Output("obtenerBusqueda") obtenerBusqueda = new EventEmitter();
    @Output("limpiar") limpiar = new EventEmitter();
    public state: string = 'small';
    public busquedaForm: FormGroup;
    public nivelEducativoLista: any = [];
    public profesionLista: any = [];
    public oficioLista: any = [];
    public btnSeleccion: boolean = false;

    constructor(private _route: ActivatedRoute, private _fb: FormBuilder, private _utilService: UtilService){
      this.busquedaForm = _fb.group({
        global_param: '',
        profesionid: '',
        oficioid: '',
        nivel_educativoid: '',
        fecha_desde: '',
        fechaDesde: '',
        fechaHasta: '',
        fecha_hasta: ''
      });
    }

    ngOnInit() {
      this.nivelEducativoLista = this._route.snapshot.data['nivelEducativo'];
      this.profesionLista = this._route.snapshot.data['profesion'];
      this.oficioLista = this._route.snapshot.data['oficio'];
    }
    /**
     * abre/cierra con animación la busqueda avanzada
     */
    abrirCerrarBusquedaAvanzada() {
      this.state = (this.state === 'small' ? 'large' : 'small');
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
     * Arma el array de busqueda para el API
     */
    realizarBusqueda() {
      let busquedaAvanzada = this.busquedaForm.value;
      let apiBusqueda:any = {};
      let esTrue: boolean = false;
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
    /**
     * Limpiar los campos de busqueda
     */
    limpiarCampos() {
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
      this.busquedaForm.patchValue(busqueda);
      this.btnSeleccion = false;
      this.state = 'small';
      this.limpiar.emit(true);
    }
    /**
     * Marca los campos que han sido utilizados en búsqueda
     * @param valor [any] contiene el valor de la variable
     * @return [boolean] devuelve el valor a marcar en booleano
     */
    marcarCampo(valor:any) {
      let marcar: boolean = false;
      marcar = (valor != null && valor != '') ? true : false;
      return marcar;
    }


}
