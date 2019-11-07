import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AmbienteTrabajoService, MensajesService } from '../core/services';

@Component({
    selector: 'app-ambiente-trabajo',
    templateUrl: './ambiente-trabajo.html',
    // styleUrls: ['./lista.component.css']
})

export class AmbienteTrabajoComponent implements OnInit {
    public ambientes:any;
    public filtradoBusqueda:any = {}; // variable que mantiene el filtro de busqueda
    public configPaginacion:any = { "colleccionSize": 0, "pageSize": 20, "page": 1, "cantRegistros": 0, "totalRegistros": 0 };

    /**
     * Inicializacion de servicios utiles para el componente
     * @param _ambienteTrabajoService servicio que maneja la conexion con el api
     * @param _mensajeService servicio que maneja los mensajes para el usuario
     */
    constructor(
        private _route: ActivatedRoute,
        private _ambienteTrabajoService: AmbienteTrabajoService,
        private _mensajeService: MensajesService,
    ) {
    }

    ngOnInit() {
      //Se configura paginación y se hace la pre-carga de la lista de ambientes
      this.config(this._route.snapshot.data['ambientes']);        
    }

    /**
     * Se configura paginación y listado de ambiente trabajo
     * @param lista [Object] colección de datos con paginación
     */
    public config(lista:any) {
        this.configPaginacion.colleccionSize = lista.total_filtrado;
        // tamaño pagina
        this.configPaginacion.pageSize = lista.pagesize;
        this.configPaginacion.cantRegistros = this.rangoInicialXpagina(this.configPaginacion.page, lista.total_filtrado, this.configPaginacion.pageSize);
        this.configPaginacion.totalRegistros = this.rangoFinalXpagina(this.configPaginacion.page, lista.total_filtrado, this.configPaginacion.pageSize);
        // total de registros
        this.ambientes = lista.resultado;     
    }

    /**
     * @function rangoInicialXpagina funcion que calcula el rango inicial
     * @param pagina numero de pagina
     * @param total cantidad de registros
     */
    public rangoInicialXpagina(pagina: number, total: number, pagesize: number){
        let paginaReal = pagina - 1;
        let rangoInicial: number = 0;
        if (total !== 0){
            rangoInicial = paginaReal * pagesize + 1;
        }
        return rangoInicial;
    }

    /**
     * @function rangoFinalXpagina funcion que calcula el rango final
     * @param pagina numero de pagina
     * @param total cantidad de registros
     */
    rangoFinalXpagina(pagina: number, total: number, pagesize:number){
    let cantRegistrosXpag = (pagina * pagesize);
    let rangoFinal: number = 0;
    if (total !== 0){
        rangoFinal = (cantRegistrosXpag < total) ? cantRegistrosXpag : total;
    }
    return rangoFinal;
    }

    /**
     * Se configura el filtrado para mostrar listado
     * @param params [object] parametros que se filtraran en la busqueda
     * @param page [number] Es el numero de pagina menos 1
     */
    buscar(params:any, page:number) {
        Object.assign(params, {page: page});
        //this.filtradoBusqueda = params;
        this._ambienteTrabajoService.buscar(params).subscribe(
          respuesta => {
            this.config(respuesta);
        }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
      }

    /**
     * Solicito el cambio de pagina
     * @param pagina [number] numero de pagina
     */
    cambiarPagina(pagina: any) {
        this.buscar(this.filtradoBusqueda, (pagina - 1));
    }

    /**
     * limpia los campos de filtro
     * @param e [boolean] valor identificable para limpiar los campos y realizar la busqueda
     */
    limpiarCampos(e:boolean) {
        this.buscar({}, 0);
      }
}
