/**
 * @class FormatObjetoAFecha validador de un número
 */
export class FormatObjetoAFecha {
    onChange(obj) {
        return obj ? obj.year + '-' + obj.month + '-' + obj.day : '';
    }

}