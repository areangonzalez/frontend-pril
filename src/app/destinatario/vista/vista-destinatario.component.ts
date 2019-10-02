import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { DestinatarioService, MensajesService } from "../../core/services";

@Component({
    selector: 'vista-destinatario',
    templateUrl: './vista-destinatario.component.html',
})
export class VistaDestinatarioComponent implements OnInit {
    page = 1;
    destinatarios: any;
    totalFiltrado: number = 0;

    constructor(
      private _destinatarioService: DestinatarioService,
      private _mensajeService: MensajesService
      ) {
    }

    ngOnInit(){
    }

}
