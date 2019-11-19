export interface IConfigurarPagina {
  colleccionSize: number,
  pageSize: number,
  page: number,
  cantRegistros: number,
  totalRegistros: number
}
/**
 * Clase que construye el objeto de la configuracion de pagina
 */
export class ConfigurarPagina implements IConfigurarPagina {

  constructor(
    public colleccionSize: number,
    public pageSize: number,
    public page: number,
    public cantRegistros: number,
    public totalRegistros: number
  ) { }
}
