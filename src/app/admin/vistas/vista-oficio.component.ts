import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'admin-vista-oficio',
    templateUrl: './vista-oficio.component.html'
})
export class VistaOficioComponent implements OnInit {
    constructor(
        private _router: Router,
      ) {
    }

    ngOnInit() {
    }
}
