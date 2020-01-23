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
  @Output("obtenerDatos") public obtenerDatos = new EventEmitter();

    constructor(
        private _router: Router,
      ) {
    }

    ngOnInit() {
    }

    editar(datos:any){
      this.obtenerDatos.emit(datos);
    }

    borrar(id:number){
      console.log(id);

    }
}
