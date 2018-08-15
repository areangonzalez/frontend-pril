import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { Alert, AlertType } from "../../models/alert.model";
import { MensajesService } from "../../services/mensajes.service";

@Component({
    selector: 'mensajes-alert',
    templateUrl: './mensajes.html',
    styleUrls: ['./mensajes.css'],
})
@Injectable()
export class MensajesComponent implements OnInit {
    @Output('eventoConfirmacion') eventoConfirmacion = new EventEmitter();
    mensaje: any;
    tipo: number;
    subscription: Subscription;

    /**
     * @param _router Servicio para la navegacion dentro del sistema
     */
    constructor(
        private _router: Router,
        private _mensajeService: MensajesService
    ) {
        this.subscription = this._mensajeService.getMessage().subscribe(mensaje => { this.mensaje = mensaje; });
     }

    ngOnInit() {
        this._mensajeService.getMessage().subscribe(
            (alert: Alert) => {
                if (!alert) {
                    return;
                }else{
                    this.mensaje = alert.mensaje;
                    this.tipo = alert.tipo;
                }

            }
        );
    }
    // remover alert
    removerMensaje(){
        this._mensajeService.clearMessage();
    }

    cssAlert(tipo: number){
        if (!alert) { return; }
        switch (tipo) {
            case AlertType.Exitoso:
                return 'alert alert-success';
            case AlertType.Cancelado:
                return 'alert alert-danger';

        }
    }

    obtenerTitulo(tipo: number){
        if (!alert) { return; }
        switch (tipo) {
            case AlertType.Exitoso:
             return 'Exitoso';
            case AlertType.Cancelado:
             return 'Cancelado';
        }
    }
}