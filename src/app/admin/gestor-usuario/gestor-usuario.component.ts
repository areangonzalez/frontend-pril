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
}
