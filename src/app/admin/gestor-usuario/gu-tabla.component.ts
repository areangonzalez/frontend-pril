import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'gu-tabla-component',
    templateUrl: './gu-tabla.component.html',
})
export class GuTablaComponent implements OnInit {

    constructor(
        private _router: Router,
      ) {
    }

    ngOnInit() {
    }

    guardarUsuario(datos:any) {
      if (datos != false){
        // guardo los datos
      }
    }

}
