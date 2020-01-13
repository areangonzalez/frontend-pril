import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'admin-vista-plan',
    templateUrl: './vista-plan.component.html'
})
export class VistaPlanComponent implements OnInit {
    constructor(
        private _router: Router,
      ) {
    }

    ngOnInit() {
    }
}
