export class Lugar {
    constructor(
        public lugarid: number,
        public localidadid: number,
        public calle: string,
        public altura: string,
        public barrio: string,
        public piso: string,
        public depto: string,
        public escalera: string,
        public usarLugarEncontrado:boolean
    ) { }

    deserialize(input: Lugar) {
        Object.assign(this, input);
        return this;
    }
}