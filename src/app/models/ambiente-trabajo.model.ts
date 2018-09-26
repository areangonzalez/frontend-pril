export interface IAmbienteTrabajo {
    id: number,
    nombre: string,
    legajo: string,
    observacion: string,
    cuit: string,
    actividad: string,
    tipo_ambiente_trabajoid: number,
}

export class AmbienteTrabajo implements IAmbienteTrabajo {

    constructor(
        public id: number,
        public nombre: string,
        public legajo: string,
        public observacion: string,
        public cuit: string,
        public actividad: string,
        public tipo_ambiente_trabajoid: number,
    ){}

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}