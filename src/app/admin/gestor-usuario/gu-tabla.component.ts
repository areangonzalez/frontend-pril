import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'gu-tabla-component',
    templateUrl: './gu-tabla.component.html',
})
export class GuTablaComponent implements OnInit {
  @Output("editarUsuario") editarUsuario = new EventEmitter();
  @Output("obtenerRolPermiso") obtenerRolPermiso = new EventEmitter();

  public listaPermisos: any = [];
  public listaRoles: any = [];

    constructor(
        private _router: Router
      ) {
    }

    ngOnInit() {
    }

    guardarUsuario(datos:any) {
      if (datos != false){
        // guardo los datos
        this.editarUsuario.emit(datos);
      }
    }

    guardarRolPermiso(datos:any) {
      if (datos != false){
        // guardo los datos
        this.obtenerRolPermiso.emit(datos);
      }
    }



}
