export class Alert {
    tipo: AlertType;
    mensaje: string;
    urlLink: string;
}

export enum AlertType {
    Exitoso,
    Cancelado,
    Confirmar
}