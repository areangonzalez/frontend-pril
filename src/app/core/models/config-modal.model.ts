/**
 * configuracion del modal agregar/modificar del abm
 */
export class IConfigModal {
    tipo: tipo;
    tituloModal: string;
    botonClass: string;
    iconoBtnClass: string;
    tituloBtn?: string;
}
/**
 * Agregar o Modificar
 */
export enum tipo {
    Agregar,
    Modificar
}

export class ConfigModal implements IConfigModal {
  public tituloModal: string;
  public tipo: number;
  public botonClass: string;
  public iconoBtnClass: string;
  public tituloBtn: string;

  constructor(
    tituloModal: string,
    tipo: number,
    botonClass: string,
    iconoBtnClass: string,
    tituloBtn?: string
  ) {
  }

}
