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
    public totalFiltrado: number = 0;
    public configPaginacion:any = { "colleccionSize": 0, "pageSize": 0, "page": 1, "cantRegistros": 0, "totalRegistros": 0 };

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
      console.log("nro pagina:", pagina);
    }
    /**
     * Se configura paginacion y listado de destinatario
     * @param destinatarios [Object] objeto que contiene los valores de paginacion y listado de destinatario
     */
    public configDestinatario(destinatarios:any) {
      this.configPaginacion.colleccionSize = destinatarios.total_filtrado;
      // tamaño pagina
      //this.configPaginacion.pageSize = destinatarios.pagesize;
      this.configPaginacion.cantRegistros = this.rangoInicialXpagina(this.configPaginacion.page, destinatarios.total_filtrado, this.configPaginacion.pageSize);
      this.configPaginacion.totalRegistros = this.rangoFinalXpagina(this.configPaginacion.page, destinatarios.total_filtrado, this.configPaginacion.pageSize);
      // total de registros
      this.destinatariosLista = destinatarios.resultado;
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
     */
    buscar(params:any) {
      this._destinatarioService.buscar(params).subscribe(
        respuesta => {
          this.configDestinatario(respuesta);
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
    }
}
