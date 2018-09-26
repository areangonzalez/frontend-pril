export interface IAmbienteTrabajo {
    id: number,
    nombre: string,
    legajo: string,
    observacion: string,
    cuit: string,
    actividad: string,
    tipo_ambiente_trabajo: number,
}

export class AmbienteTrabajo implements IAmbienteTrabajo {

    constructor(
        public id: number,
        public nombre: string,
        public legajo: string,
        public observacion: string,
        public cuit: string,
        public actividad: string,
        public tipo_ambiente_trabajo: number,
    ){}

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}