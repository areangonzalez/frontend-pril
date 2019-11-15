import { Injectable } from "@angular/core";

@Injectable()
export class ConfiguracionParaPaginarService {

  constructor() {}

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
     * Se configura paginacion y listado de destinatario
     * @param datos [Object] objeto que contiene los datos (pagesize, page, total_filtrado) de paginacion
     * @returns devuelve un objeto de configuracion de paginas con sus rangos
     */
    public config(datos:any) {
      let configPaginacion:any = { "colleccionSize": 0, "pageSize": 20, "page": 1, "cantRegistros": 0, "totalRegistros": 0 };
      configPaginacion.colleccionSize = datos.total_filtrado;
      // tamaño pagina
      configPaginacion.pageSize = datos.pagesize;
      configPaginacion.cantRegistros = this.rangoInicialXpagina(configPaginacion.page, datos.total_filtrado, configPaginacion.pageSize);
      configPaginacion.totalRegistros = this.rangoFinalXpagina(configPaginacion.page, datos.total_filtrado, configPaginacion.pageSize);
      // total de registros
      return configPaginacion;
    }

}
