import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'abm-tabla',
    templateUrl: './abm-tabla.component.html',
    styleUrls: ['./abm-tabla.css']
})
export class AbmTablaComponent implements OnInit {
  @Input("titulosArray") public titulosArray:any;
  @Input("listado") public listado:any;
  @Input("nombreAbm") public nombreAbm: string;
  @Output("obtenerDatos") public obtenerDatos = new EventEmitter();
  @Output("borrarDato") public borrarDato = new EventEmitter();

  public tituloEditar = 'Editar ';

    constructor(
        private _router: Router,
      ) {

    }

    ngOnInit() {
      this.tituloEditar += this.nombreAbm;
    }

    editar(datos:any){
      if (datos !== false){
        this.obtenerDatos.emit(datos);
      }
    }

    borrar(dato:any){
      if (dato !== false){
        this.borrarDato.emit(dato);
      }
    }
}
