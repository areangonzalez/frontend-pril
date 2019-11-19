export interface IConfigurarPagina {
  colleccionSize: number,
  pageSize: number,
  page: number,
  cantRegistros: number,
  totalRegistros: number
}

export class ConfigurarPagina implements IConfigurarPagina {

  constructor(
    public colleccionSize: number,
    public pageSize: number,
    public page: number,
    public cantRegistros: number,
    public totalRegistros: number
  ) { }
}
