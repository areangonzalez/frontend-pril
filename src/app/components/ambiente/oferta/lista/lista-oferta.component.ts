import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';

@Component({
    selector: 'lista-oferta',
    templateUrl: './lista-oferta.html',
    //styleUrls: ['./lista-oferta.css']
})
export class ListaOfertaComponent implements OnInit {
    @Input('listaOfertas') public listaOfertas: Object;
    @Input('nombreAmbiente') public nombreAmbiente: string;
    @Input('mostrarEdicion') public mostrarEdicion:number; 
    @Output('guardarOferta') public guardarOferta = new EventEmitter();

    constructor(
        private _router: Router
    ) { }

    ngOnInit() {
        // breadcrumbs Dinamico
    }

    obtenerParametrosOferta(params) {
        this.guardarOferta.emit(params);
    }

}