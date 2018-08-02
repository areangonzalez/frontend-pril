import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "./../../breadcrumbs/breadcrumbs.service";

@Component({
    selector: 'area-entrenamiento-vista',
    templateUrl: './vista-area-entrenamiento.html',
    styleUrls: ['./vista-area-entrenamiento.css']
})
export class VistaAreaEntrenamientoComponent implements OnInit {
    page = 1;

    constructor(private breadcrumbsService: BreadcrumbsService, private _router: Router) {
    }

    ngOnInit() {
        this.breadcrumbsService.store([
            { label: 'Inicio', url: 'inicio', params: [] },
            { label: 'Área de entrenamiento', url: 'area', params: [] },
            { label: 'Vista', url: 'area/vista', params: [] }]);
    }

    public areas = [
        { fecha_inicial: '07/11/2018', fecha_final: '07/04/2019', tarea: 'Limpieza', destinatario: 'Gomez, Eduardo', ambiente_trabajo: 'Cooperativa obrera', plan: '$5000 / 20hs', estado: 'activo', id: 1 },
        { fecha_inicial: '07/06/2018', fecha_final: '07/08/2018', tarea: 'Cajero', destinatario: 'Fernandez, Nicolas', ambiente_trabajo: 'Panadería Panonto', plan: '$2000 / 20hs', estado: 'Finalizado', id: 2 },
        { fecha_inicial: '07/05/2018', fecha_final: '07/11/2018', tarea: 'Limpieza', destinatario: 'Gonzalez, Carlos', ambiente_trabajo: 'Panadería San Fernando', plan: '$1000 / 5hs', estado: 'activo', id: 3 },
        { fecha_inicial: '07/03/2018', fecha_final: '07/09/2018', tarea: 'Chofer', destinatario: 'Carrizo, Eliana', ambiente_trabajo: 'Coca cola', plan: '$2000 / 10hs', estado: 'activo', id: 4 },
        { fecha_inicial: '07/04/2018', fecha_final: '07/10/2018', tarea: 'Mantenimiento', destinatario: 'Gutierrez, Pablo', ambiente_trabajo: 'Cine gama', plan: '$5000 / 20hs', estado: 'activo', id: 5 }
    ];

    volver() {
        this._router.navigate(['area']);
    }
}