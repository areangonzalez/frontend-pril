import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'admin-vista-profesion',
    templateUrl: './vista-profesion.component.html'
})
export class VistaProfesionComponent implements OnInit {
    constructor(
        private _router: Router,
      ) {
    }

    ngOnInit() {
    }
}
