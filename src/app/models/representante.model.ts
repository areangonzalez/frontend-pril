export interface IRepresentante {
    id: number,
    nro_documento: string,
    apellido: string,
    nombre: string,
    telefono: string,
    celular: string,
    fax: string,
    email: string
}

export class Representante {

    constructor(
        public id: number,
        public nro_documento: string,
        public apellido: string,
        public nombre: string,
        public telefono: string,
        public celular: string,
        public fax: string,
        public email: string,
    ){}

    deserialize(input: Representante) {
        Object.assign(this, input);
        return this;
    }
}
