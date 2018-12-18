import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "../breadcrumbs/breadcrumbs.service";
// services
import { AmbienteTrabajoService } from "../../services/ambiente-trabajo.service";
import { MensajesService } from "../../services/mensajes.service";

@Component({
    selector: 'app-ambiente-trabajo',
    templateUrl: './ambiente-trabajo.html',
    // styleUrls: ['./lista.component.css']
})
export class AmbienteTrabajoComponent implements OnInit {
    public ambientes:any;
    public page = 1;
    public totalFiltrado:number = 0;

    /**
     * Inicializacion de servicios utiles para el componente
     * @param _breadcrumbsService servicio del recorrido del usuario por el sistema
     * @param _ambienteTrabajoService servicio que maneja la conexion con el api
     * @param _mensajeService servicio que maneja los mensajes para el usuario
     */
    constructor(
        private _breadcrumbsService: BreadcrumbsService,
        private _ambienteTrabajoService: AmbienteTrabajoService,
        private _mensajeService: MensajesService
    ) {
    }

    ngOnInit() {
        this._breadcrumbsService.store([
            { label: 'Inicio', url: 'inicio', params: [] },
            { label: 'Ambiente de trabajo', url: 'ambiente', params: [] }]);

        this.listaAmbientes();
    }

    private listaAmbientes() {
        this._ambienteTrabajoService.listarAmbienteTrabajo().subscribe(
            datos => {
                this.ambientes = datos['coleccion'];
                this.totalFiltrado = datos['total_filtrado'];
            }, error => {
                this._mensajeService.cancelado(error, [{ name: '' }]);
            }
        );
    }
}
