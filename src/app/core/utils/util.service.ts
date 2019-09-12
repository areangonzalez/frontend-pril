import { Injectable } from "@angular/core";

export class UtilService {

  constructor() {}

  /**
   * validarNumero valida un numero
   * @var value [string] texto
   * @return [boolean] debuelve verdadero o falso si es o no un numero
   */
  public validarNumero(value) {
    var number = /^([0-9])*$/;
    return number.test(value);
  }

  /**
   * FormatObjetoAFecha validador de un número
   * @var [Object] objeto que contiene una fecha
   * @return [string] devuelve un string
   */
 public formatObjetoAFecha(obj) {
  return obj ? obj.year + '-' + obj.month + '-' + obj.day : '';
}

}
