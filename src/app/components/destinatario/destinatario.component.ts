import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "../breadcrumbs/breadcrumbs.service";
import { DestinatarioService } from "../../services/destinatario.service";
import { MensajesService } from "../../services/mensajes.service";

@Component({
    selector: 'app-destinatario',
    templateUrl: './destinatario.html',
    // styleUrls: ['./lista.component.css']
})
export class DestinatarioComponent implements OnInit {
    page = 1;
    destinatarios: any;
    totalFiltrado: number = 0;

    constructor(private breadcrumbsService: BreadcrumbsService, private _destinatarioService: DestinatarioService, private _mensajeService: MensajesService) {
    }

    ngOnInit(){
        this.breadcrumbsService.store([
            { label: 'Inicio', url: 'inicio', params: [] },
            { label: 'Destinatario', url: 'destinatario', params: [] }]);
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