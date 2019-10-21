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

    abrirCerrarBusquedaAvanzada() {
      this.state = (this.state === 'small' ? 'large' : 'small');
    }

    obtenerFechaDesde(fechaDesde: any) {
      this.busquedaForm.get('fecha_desde').patchValue(this._utilService.formatObjetoAFecha(fechaDesde));
    }

    obtenerFechaHasta(fechaHasta: object) {
      this.busquedaForm.get('fecha_hasta').setValue(this._utilService.formatObjetoAFecha(fechaHasta));
    }


    realizarBusqueda() {
      let busquedaAvanzada = this.busquedaForm.value;
      let apiBusqueda:any = {};

      for (const clave in busquedaAvanzada) {
        if(busquedaAvanzada[clave] !== '' && busquedaAvanzada[clave] !== null && (busquedaAvanzada[clave])){
          if (clave != 'fechaDesde' && clave != 'fechaHasta'){
            Object.assign(apiBusqueda, {[clave]: busquedaAvanzada[clave]});
          }
        }
      }
      this.obtenerBusqueda.emit(apiBusqueda);
    }

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
      this.limpiar.emit(true);
    }


}
