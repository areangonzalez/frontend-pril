import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'area-entrenamiento-busqueda',
    templateUrl: './busqueda-area-entrenamiento.html',
    styleUrls: ['./busqueda-area-entrenamiento.css']
})
export class BusquedaAreaEntrenamientoComponent implements OnInit {
  @Output("obtenerBusqueda") public obtenerBusqueda = new EventEmitter();
    public isCollapsed = true;
    public buscarForm: FormGroup;

    constructor(private _router: Router, private _fb: FormBuilder) {
      this.buscarForm = _fb.group({
        global_param: '',
        estado: '',
        fechaInicialDesde: '',
        fecha_inicial_desde: '',
        fechaInicialHasta: '',
        fecha_inicial_hasta: ''
      });
    }

    ngOnInit() {
    }

    agregarArea(){
        this._router.navigate(['inicio','area-entrenamiento', 'crear-seleccion']);
    }

    buscar() {
      this.obtenerBusqueda.emit(this.buscarForm.value);
    }

}
