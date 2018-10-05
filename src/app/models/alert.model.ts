export class Alert {
    tipo: AlertType;
    mensaje: string;
    urlLink?: IUrl;
}

export enum AlertType {
    Exitoso,
    Cancelado,
    Confirmar,
    Ofertar
}

export interface IUrl {
    name: string,
    param?: number
}