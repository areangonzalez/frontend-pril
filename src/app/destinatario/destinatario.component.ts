import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinatarioService, MensajesService } from '../core/services';

@Component({
    selector: 'app-destinatario',
    templateUrl: './destinatario.html',
})
@Injectable()
export class DestinatarioComponent implements OnInit {
    public destinatariosLista: any[] = [];
    public configPaginacion:any = { "colleccionSize": 0, "pageSize": 20, "page": 1, "cantRegistros": 0, "totalRegistros": 0 };
    public filtradoBusqueda:any = {}; // variable que mantiene el filtro de busqueda

    constructor(
      private _route: ActivatedRoute, private _destinatarioService: DestinatarioService, private _mensajeService: MensajesService
      ) {
    }

    ngOnInit(){
      //obtengo lista de destinatarios
      this.configDestinatario(this._route.snapshot.data['destinatarios']);
    }
    /**
     * Solicito el cambio de pagina
     * @param pagina [number] numero de pagina
     */
    cambiarPagina(pagina: any) {
      this.buscar(this.filtradoBusqueda, (pagina - 1));
      //console.log("nro pagina:", pagina);
    }
    /**
     * Se configura paginacion y listado de destinatario
     * @param destinatarios [Object] objeto que contiene los valores de paginacion y listado de destinatario
     */
    public configDestinatario(datos:any) {
      this.configPaginacion.colleccionSize = datos.total_filtrado;
      // tamaño pagina
      //this.configPaginacion.pageSize = datos.pagesize;
      this.configPaginacion.cantRegistros = this.rangoInicialXpagina(this.configPaginacion.page, datos.total_filtrado, this.configPaginacion.pageSize);
      this.configPaginacion.totalRegistros = this.rangoFinalXpagina(this.configPaginacion.page, datos.total_filtrado, this.configPaginacion.pageSize);
      // total de registros
      this.destinatariosLista = datos.resultado;
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
     * Configurar busqueda avanzada para mostrar listado
     * @param params [object] parametros que se filtraran en la busqueda
     * @param page [number] Es el numero de pagina menos 1
     */
    buscar(params:any, page:number) {
      Object.assign(params, {page: page});
      this._destinatarioService.buscar(params).subscribe(
        respuesta => {
          this.configDestinatario(respuesta);
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
    }

    /**
     * limpia los campos del formulario de busqueda avanzada
     * @param e [boolean] valor identificable para limpiar los campos y realizar la busqueda
     */
    limpiarCampos(e:boolean) {
      this.buscar({}, 0);
    }
}
