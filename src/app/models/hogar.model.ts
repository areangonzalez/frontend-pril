export class Hogar {
    constructor(
        public localidadid: number,
        public calle: string,
        public altura: string,
        public barrio: string,
        public piso: string,
        public departamento: string
    ) { }

    deserialize(input: Hogar) {
        Object.assign(this, input);
        return this;
    }
}