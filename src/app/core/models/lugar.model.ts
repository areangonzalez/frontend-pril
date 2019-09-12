export class Lugar {
    constructor(
        public id: number,
        public localidadid: number,
        public calle: string,
        public altura: string,
        public barrio: string,
        public piso: string,
        public depto: string,
        public escalera: string,
        public localidad: string
    ) { }

    deserialize(input: Lugar) {
        Object.assign(this, input);
        return this;
    }
}
