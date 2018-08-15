import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from "../../../../services/mensajes.service";
import { Observable } from "rxjs";

@Component({
    selector: 'lista-estudio',
    templateUrl: './lista-estudio.html',
    //styleUrls: ['./form-destinatario.css'],
})
@Injectable()
export class ListaEstudioComponent implements OnInit {
    @Input("listaEstudios") public listaEstudios;

    private respuestaMensaje: any;

    /**
     * @param _router Servicio para la navegacion dentro del sistema
     */
    constructor(
        private _router: Router,
        private _mensajeService: MensajesService
    ) {}

    ngOnInit() {
    }

    borrarEstudio(id){
        this.listaEstudios.splice(id, 1);
    }
}