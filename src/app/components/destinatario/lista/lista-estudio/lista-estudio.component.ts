import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'lista-estudio',
    templateUrl: './lista-estudio.html',
    //styleUrls: ['./form-destinatario.css'],
})
@Injectable()
export class ListaEstudioComponent implements OnInit {
    @Input("listaEstudios") public listaEstudios;
    /**
     * @param _router Servicio para la navegacion dentro del sistema
     */
    constructor(
        private _router: Router,
    ) {}

    ngOnInit() {
    }

    borrarEstudio(id){
        this.listaEstudios.splice(id, 1);
    }
}