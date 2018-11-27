import { Lugar } from "./lugar.model";
import { Representante } from "./representante.model";

export interface IAmbienteTrabajo {
    id: number,
    nombre: string,
    legajo: string,
    observacion: string,
    cuit: string,
    actividad: string,
    tipo_ambiente_trabajoid: number,
    lugar: Lugar,
    persona: Representante,
    tipo_ambiente_trabajo: string

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
        public lugar: Lugar,
        public persona: Representante,
        public tipo_ambiente_trabajo: string
    ){}

    deserialize(input: any) {
        Object.assign(this, input);
        this.lugar = new Lugar(0, 0, '', '', '', '', '', '', '').deserialize(input.lugar);
        this.persona = new Representante(0,'','','','','','','').deserialize(input.representante);
        return this;
    }

}
