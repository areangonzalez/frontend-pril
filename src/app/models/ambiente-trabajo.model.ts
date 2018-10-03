import { Lugar } from "./lugar.model";

export interface IAmbienteTrabajo {
    id: number,
    nombre: string,
    legajo: string,
    observacion: string,
    cuit: string,
    actividad: string,
    tipo_ambiente_trabajoid: number,
    lugar: Lugar
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
        public lugar: Lugar
    ){}

    deserialize(input: any) {
        Object.assign(this, input);
        this.lugar = new Lugar(0, 0, '', '', '', '', '', '', false).deserialize(input.lugar);
        return this;
    }

}