import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';

@Component({
    selector: 'lista-oferta',
    templateUrl: './lista-oferta.html',
    //styleUrls: ['./lista-oferta.css']
})
export class ListaOfertaComponent implements OnInit {
    @Input('ofertas') ofertas: Object;

    constructor(
        private _router: Router
    ) { }

    ngOnInit() {
        // breadcrumbs Dinamico
    }

}