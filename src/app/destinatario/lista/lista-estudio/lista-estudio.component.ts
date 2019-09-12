import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from "../../../../services/mensajes.service";
import { Observable } from "rxjs";

@Component({
    selector: 'lista-estudio',
    templateUrl: './lista-estudio.html',
    styleUrls: ['./lista-estudio.css'],
})
@Injectable()
export class ListaEstudioComponent implements OnInit {
    /**
     * @var listaEstudio listado de estudio que se mostrara en la tabla
     * @var tipo vista: oculta la columna de accion y muestra los datos
     *           form: muestra todas las columnas para el formulario.
     */
    @Input("listaEstudios") public listaEstudios;
    @Input("tipo") public tipo:any;

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
