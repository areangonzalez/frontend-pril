import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'admin-vista-redes-sociales',
    templateUrl: './vista-redes-sociales.component.html'
})
export class VistaRedesSocialesComponent implements OnInit {
    constructor(
        private _router: Router,
      ) {
    }

    ngOnInit() {
    }
}
