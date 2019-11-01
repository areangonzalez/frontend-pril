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
  public state: string = 'small';
  public buscarForm: FormGroup;
  public planLista: any[] = [];
  public estadoLista: any[] = [{ id:"finalizado", nombre: "Finalizado" }, { id: "vigente", nombre: "Vigente" }];


    constructor(
      private _router: Router, private _fb: FormBuilder, private _route: ActivatedRoute, private _utilService: UtilService
    ) {
      this.buscarForm = _fb.group({
        global_param: '',
        estado: '',
        plan: '',
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
    buscar() {
      this.obtenerBusqueda.emit(this.buscarForm.value);
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
      this.buscarForm.get('fecha_desde').patchValue(this._utilService.formatObjetoAFecha(fechaDesde));
    }
    /**
     * Convierte la fecha de objeto a string
     * @param fechaHasta [objeto] obtengo el objeto del ngbDate
     */
    obtenerFechaHasta(fechaHasta: object) {
      this.buscarForm.get('fecha_hasta').setValue(this._utilService.formatObjetoAFecha(fechaHasta));
    }

}
