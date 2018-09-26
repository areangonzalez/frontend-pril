import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "../breadcrumbs/breadcrumbs.service";
// services
import { AmbienteTrabajoService } from "../../services/ambiente-trabajo.service";

@Component({
    selector: 'app-ambiente-trabajo',
    templateUrl: './ambiente-trabajo.html',
    // styleUrls: ['./lista.component.css']
})
export class AmbienteTrabajoComponent implements OnInit {
    public ambienteListado:any[] = [];
    public page = 1;

    constructor(
        private _breadcrumbsService: BreadcrumbsService,
        private _ambienteTrabajoService: AmbienteTrabajoService
    ) {
    }

    ngOnInit() {
        this._breadcrumbsService.store([
            { label: 'Inicio', url: 'inicio', params: [] },
            { label: 'Ambiente de trabajo', url: 'ambiente', params: [] }]);

        this.listaAmbientes();
    }

    public ambientes = [
        { nombre: 'Panaderia san Fernando', cuit: '2033476724', representante: 'Rodriguez, Raul', tipo: 'Empleador Pirvado', estado: 'Activo', id: 1 },
        { nombre: 'Cooperia Obrera', cuit: '2033476723', representante: 'Lopez, laura', tipo: 'Cooperativa', estado: 'Activo', id: 2 },
        { nombre: 'Municipalidad de viedma', cuit: '2033476723', representante: 'Martinez, Francisco', tipo: 'Organismo público', estado: 'Activo', id: 3 },
        { nombre: 'Heladeria Sei Tu', cuit: '2033476722', representante: 'Martinez, Pamela', tipo: 'Organismo público', estado: 'Activo', id: 4 },
        { nombre: 'Panaderia Panonto', cuit: '2033476721', representante: 'Acosta, Jose', tipo: 'Organismo público', estado: 'Activo', id: 5 }
    ];
    
    
    private listaAmbientes() {
        //this._ambienteTrabajoService
    }
}