import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'admin-vista-tipo-ambiente-trabajo',
    templateUrl: './vista-tipo-ambiente-trabajo.component.html'
})
export class VistaTipoAmbienteTrabajoComponent implements OnInit {
    constructor(
        private _router: Router,
      ) {
    }

    ngOnInit() {
    }
}
