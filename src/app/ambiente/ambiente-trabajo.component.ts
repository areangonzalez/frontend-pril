import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AmbienteTrabajoService, MensajesService } from '../core/services';
import { ConfigurarPagina } from "../core/models";
import { ConfiguracionParaPaginarService } from 'src/app/core/utils';

@Component({
    selector: 'app-ambiente-trabajo',
    templateUrl: './ambiente-trabajo.html',
    providers: [ConfiguracionParaPaginarService]
})

export class AmbienteTrabajoComponent implements OnInit {
    public ambientes:any;
    public filtradoBusqueda:any = {}; // variable que mantiene el filtro de busqueda
    public configPaginacion:ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de destinatarios

    /**
     * Inicializacion de servicios utiles para el componente
     * @param _ambienteTrabajoService servicio que maneja la conexion con el api
     * @param _mensajeService servicio que maneja los mensajes para el usuario
     */
    constructor(
        private _route: ActivatedRoute,
        private _ambienteTrabajoService: AmbienteTrabajoService,
        private _mensajeService: MensajesService,
        private _confPaginacion: ConfiguracionParaPaginarService
    ) {
    }

    ngOnInit() {
      //Se configura paginación y se hace la pre-carga de la lista de ambientes
      this.config(this._route.snapshot.data['ambientes'],1);        
    }

    /**
     * Se configura paginación y listado de ambiente trabajo
     * @param lista [Object] colección de datos con paginación
     */
    public config(lista:any, pagina:number) {
        this.configPaginacion = this._confPaginacion.config(lista, pagina);
        // total de registros
        this.ambientes = lista.resultado;     
    }

    /**
     * Se filtran ambientes con criterio de busquedad y pagina
     * @param params [object] parametros que se filtraran en la busqueda
     * @param page [number] Es el numero de pagina menos 1
     */
    buscar(params:any, page:number) {
        Object.assign(params, {page: (page-1)});
        this.filtradoBusqueda = params;
        this._ambienteTrabajoService.buscar(params).subscribe(
          respuesta => {
            this.config(respuesta,page);
        }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
    }

    /**
     * Se realiza la busquedad con cambio de pagina, por otro lado persistimos la pagina
     * @param pagina [number] numero de pagina
     */
    cambiarPagina(pagina: any) {
        this.buscar(this.filtradoBusqueda, pagina);
    }

    /**
     * limpia los campos de filtro
     * @param e [boolean] valor identificable para limpiar los campos y realizar la busqueda
     */
    limpiarCampos(e:boolean) {
        this.buscar({}, 1);
    }
}
