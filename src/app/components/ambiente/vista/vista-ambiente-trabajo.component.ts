import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "../../breadcrumbs/breadcrumbs.service";

@Component({
    selector: 'ambiente-trabajo-vista',
    templateUrl: './vista-ambiente-trabajo.html',
    styleUrls: ['./vista-ambiente-trabajo.css']
})
export class VistaAmbienteTrabajoComponent {
    private ofertas = [
        { fecha_inicial: "12/07/2018", puesto: "Chofer", dias_horarios: "Lunes a viernes 06hs a 08hs", estado: "Vacante", id:1 },
        { fecha_inicial: "15/08/2018", puesto: "Limpieza", dias_horarios: "Lunes a viernes 21hs a 23hs", estado: "Ocupado", id: 2 },
        { fecha_inicial: "07/09/2018", puesto: "Cajero", dias_horarios: "Lunes a viernes 08hs a 12hs", estado: "Finalizado", id: 3 }
    ];

    constructor(
        private _router: Router,
        private _breadcrumbsService: BreadcrumbsService
    ) { }

    ngOnInit() {
        // breadcrumbs Dinamico
        this._breadcrumbsService.store([{ label: 'Inicio', url: 'inicio', params: [] }, { label: 'Ambiente de trabajo', url: 'ambiente', params: [] }, { label: 'Ver', url: 'ambiente/vista', params: [] }]);
    }

    volver() {
        this._router.navigate(['ambiente']);
    }

}
