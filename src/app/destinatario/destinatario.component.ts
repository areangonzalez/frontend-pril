import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { DestinatarioService } from "../core/services/destinatario.service";
import { MensajesService } from "../core/services/mensajes.service";

@Component({
    selector: 'app-destinatario',
    templateUrl: './destinatario.html',
})
export class DestinatarioComponent implements OnInit {
    page = 1;
    destinatarios: any;
    totalFiltrado: number = 0;

    constructor(
      private _destinatarioService: DestinatarioService,
      private _mensajeService: MensajesService
      ) {
    }

    ngOnInit(){
        // listar destinatarios
        this.listar();

    }

    listar() {
        this._destinatarioService.listarDestinatario().subscribe(
            datos => {
                if (datos['success']) {
                    this.destinatarios = datos['coleccion'];
                    this.totalFiltrado = datos['coleccion'].length;
                    //this.totalFiltrado = datos['total_filtrado'];
                }
            },
            error => {
                this._mensajeService.cancelado(error, [{name:''}]);
                console.log(<any>error);
            }
        );
    }
}
