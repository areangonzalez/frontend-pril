/**
 * @class Validarnumero validador de un número
 */
export class ValidarNumero {
    onKey(value) {
        var number = /^([0-9])*$/;
        return number.test(value);
    }

}