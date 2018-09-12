import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "../breadcrumbs/breadcrumbs.service";
import { DestinatarioService } from "../../services/destinatario.service";

@Component({
    selector: 'app-destinatario',
    templateUrl: './destinatario.html',
    // styleUrls: ['./lista.component.css']
})
export class DestinatarioComponent implements OnInit {
    page = 1;
    destinatarios:any;

    constructor(private breadcrumbsService: BreadcrumbsService, private _destinatarioService: DestinatarioService) {
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
                this.destinatarios = datos;
                console.log(this.destinatarios);
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}