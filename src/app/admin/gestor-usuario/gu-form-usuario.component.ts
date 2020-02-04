import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'gu-form-usuario',
    templateUrl: './gu-form-usuario.component.html',
})
export class GuFormUsuarioComponent implements OnInit {

    constructor(
        private _router: Router,
      ) {
    }

    ngOnInit() {
    }
}
