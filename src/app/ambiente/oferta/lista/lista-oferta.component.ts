/* import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'lista-oferta',
    templateUrl: './lista-oferta.html',
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
    }

    obtenerParametrosOferta(params) {
        this.guardarOferta.emit(params);
    }

} */
