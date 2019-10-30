import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'lista-oferta',
    templateUrl: './lista-oferta.html',
})
export class ListaOfertaComponent implements OnInit {
    @Input('listaOfertas') public lista_ofertas: any;
    @Input('nombreAmbiente') public nombreAmbiente: string;
    @Input('mostrarEdicion') public mostrarEdicion:number;
    @Output('guardarOferta') public guardarOferta = new EventEmitter();

    constructor(
        private _router: Router,
        config: NgbTooltipConfig
    ) {
        config.placement = 'top';
        config.triggers = 'click';
    }

    ngOnInit() {
    }

    obtenerParametrosOferta(params) {
        this.guardarOferta.emit(params);
    }

}
