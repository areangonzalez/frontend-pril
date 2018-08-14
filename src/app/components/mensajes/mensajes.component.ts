import { Component, OnDestroy, Injectable } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { MensajesService } from "../../services/mensajes.service";

@Component({
    selector: 'mensajes-alert',
    templateUrl: './mensajes.html',
    styleUrls: ['./mensajes.css'],
})
@Injectable()
export class MensajesComponent implements OnDestroy {
    mensaje: any;
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

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    removerMensaje(){
        this._mensajeService.clearMessage();
    }
}