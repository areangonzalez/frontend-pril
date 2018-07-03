import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';

@Component({
    selector: 'vista-oferta',
    templateUrl: './oferta.html',
    styleUrls: ['./oferta.css']
})
export class OfertaComponent implements OnInit {
    @Input('ofertas') ofertas: Object;

    constructor(
        private _router: Router
    ) { }

    ngOnInit() {
        // breadcrumbs Dinamico
    }

}
