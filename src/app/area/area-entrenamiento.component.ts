import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AreaEntrenamientoService } from 'src/app/core/services/area-entrenamiento.service';
import { MensajesService } from 'src/app/core/services/mensajes.service';


@Component({
    selector: 'app-area-entrenamiento',
    templateUrl: './area-entrenamiento.html',
    // styleUrls: ['./lista.component.css']
})
export class AreaEntrenamientoComponent implements OnInit {
    public areas:any[] = [];
    public configPaginacion:any = { "colleccionSize": 0, "pageSize": 20, "page": 1, "cantRegistros": 0, "totalRegistros": 0 }; // objeto para configuracion de pagina
    public filtradoBusqueda:any = {}; // variable que mantiene el filtro de busqueda

    constructor(
      private _route: ActivatedRoute,
      private _areaEntrenamientoService: AreaEntrenamientoService,
      private _mensajesService: MensajesService
    ) {}

    ngOnInit() {
      // Obtener listado de area de entrenamiento
      this.config(this._route.snapshot.data['listadoAreas']);
    }
    /**
     * Configurar busqueda avanzada para mostrar listado
     * @param params [object] parametros que se filtraran en la busqueda
     * @param page [number] Es el numero de pagina menos 1
     */
    buscar(params:any, page:number) {
      Object.assign(params, {page: 0});
      console.log(params);
      this._areaEntrenamientoService.buscar(params).subscribe(
        busqueda => {
          this.config(busqueda);
      }, error => { this._mensajesService.cancelado(error, [{name:''}]); })
    }

    /**
     * limpia los campos del formulario de busqueda avanzada
     * @param e [boolean] valor identificable para limpiar los campos y realizar la busqueda
     */
    limpiarCampos(e:boolean) {
      this.buscar({}, 0);
    }

    /**
     * Se configura paginacion y listado de destinatario
     * @param destinatarios [Object] objeto que contiene los valores de paginacion y listado de destinatario
     */
    public config(destinatarios:any) {
      this.configPaginacion.colleccionSize = destinatarios.total_filtrado;
      // tamaño pagina
      //this.configPaginacion.pageSize = destinatarios.pagesize;
      this.configPaginacion.cantRegistros = this.rangoInicialXpagina(this.configPaginacion.page, destinatarios.total_filtrado, this.configPaginacion.pageSize);
      this.configPaginacion.totalRegistros = this.rangoFinalXpagina(this.configPaginacion.page, destinatarios.total_filtrado, this.configPaginacion.pageSize);
      // total de registros
      this.areas = destinatarios.resultado;
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
}
