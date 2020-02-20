import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'gestor-usuario-component',
    templateUrl: './gestor-usuario.component.html',
})
export class GestorUsuarioComponent implements OnInit {

    constructor(
        private _router: Router,
      ) {
    }

    ngOnInit() {
    }

    guardarUsuario(datos:any) {
      // servicio para guardar usuario
      console.log("guardo usuario: ",datos);
    }

    guardarRolUsuario(datos: any) {
      // servicio para guardar rol de un usuario
      console.log("guardo rol y permisos: ",datos);
    }
}
