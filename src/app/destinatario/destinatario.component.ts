import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-destinatario',
    templateUrl: './destinatario.html',
})
export class DestinatarioComponent implements OnInit {
    public destinatariosLista: any[] = [];
    public totalFiltrado: number = 0;
    public configPaginacion:any = { "colleccionSize": 0, "pageSize": 0, "page": 1, "cantRegistros": 0, "totalRegistros": 0 };

    constructor(
      private _route: ActivatedRoute,
      ) {
    }

    ngOnInit(){
      //obtengo lista de destinatarios
      this.configDestinatario(this._route.snapshot.data['destinatarios']);
    }

    cambiarPagina(pagina: any) {
      console.log("nro pagina:", pagina);
    }
    /**
     * Configuracion de Destinatario
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

    /* Busqueda avanzada */

    configurarBusqueda(busqueda:any) {
      console.log(busqueda);
    }
}
