import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'abm-tabla',
    templateUrl: './abm-tabla.component.html',
    styleUrls: ['./abm-tabla.css']
})
export class AbmTablaComponent implements OnInit {
    constructor(
        private _router: Router,
      ) {
    }

    ngOnInit() {
    }
}
