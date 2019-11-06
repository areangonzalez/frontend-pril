import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, transition, state, animate, style } from '@angular/animations';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilService } from 'src/app/core/utils';

@Component({
    selector: 'area-entrenamiento-busqueda',
    templateUrl: './busqueda-area-entrenamiento.html',
    styleUrls: ['./busqueda-area-entrenamiento.css'],
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
export class BusquedaAreaEntrenamientoComponent implements OnInit {
  @Output("obtenerBusqueda") public obtenerBusqueda = new EventEmitter();
  @Output("limpiar") public limpiar = new EventEmitter();
  public state: string = 'small';
  public busquedaForm: FormGroup;
  public planLista: any = [];
  public estadoLista: any = [{ id:"finalizado", nombre: "Finalizado" }, { id: "vigente", nombre: "Vigente" }];
  public btnSeleccion: boolean = false;
  public global_param: string = '';


    constructor(
      private _router: Router, private _fb: FormBuilder, private _route: ActivatedRoute, private _utilService: UtilService
    ) {
      this.busquedaForm = _fb.group({
        estado: '',
        planid: '',
        fechaInicialDesde: '',
        fecha_inicial_desde: '',
        fechaInicialHasta: '',
        fecha_inicial_hasta: ''
      });
    }

    ngOnInit() {
      this.planLista = this._route.snapshot.data['planes'];
    }
    /**
     * Redirecciona al usuario al formulario para agregar un area de entrenamiento
     */
    agregarArea(){
        this._router.navigate(['inicio','area-entrenamiento', 'crear-seleccion']);
    }
    /**
     * Arma el array de parametros a buscar
     */
    realizarBusqueda() {
      let busquedaAvanzada = this.busquedaForm.value;
      let apiBusqueda:any = {};
      let esTrue: boolean = false;

      // parametro del input buscar, no esta en conjunto al formulario
      if (this.global_param !== ''){
        Object.assign(apiBusqueda, {'global_param': this.global_param});
      }
      for (const clave in busquedaAvanzada) {
        if(busquedaAvanzada[clave] !== '' && busquedaAvanzada[clave] !== null && (busquedaAvanzada[clave])){
          if (clave != 'fechaInicialDesde' && clave != 'fechaInicialHasta'){
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
     * abre con animación la busqueda avanzada
     */
    abrirCerrarBusquedaAvanzada() {
      this.state = (this.state === 'small' ? 'large' : 'small');
    }
    /**
     * Convierte la fecha de objeto a string
     * @param fechaDesde [objeto] obtengo el objeto del ngbDate
     */
    obtenerFechaDesde(fechaDesde: any) {
      this.busquedaForm.get('fecha_inicial_desde').patchValue(this._utilService.formatObjetoAFecha(fechaDesde));
    }
    /**
     * Convierte la fecha de objeto a string
     * @param fechaHasta [objeto] obtengo el objeto del ngbDate
     */
    obtenerFechaHasta(fechaHasta: object) {
      this.busquedaForm.get('fecha_inicial_hasta').setValue(this._utilService.formatObjetoAFecha(fechaHasta));
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
      this.global_param = '';
      this.busquedaForm.patchValue(busqueda);
      this.btnSeleccion = false;
      this.state = 'small';
      this.limpiar.emit(true);
    }

}
