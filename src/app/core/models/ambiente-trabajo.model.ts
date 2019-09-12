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
    tipo_ambiente_trabajo: string,
    telefono1: string,
    telefono2: string,
    telefono3: string,
    fax: string,
    email: string
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
        public tipo_ambiente_trabajo: string,
        public telefono1: string,
        public telefono2: string,
        public telefono3: string,
        public fax: string,
        public email: string
    ){}

    deserialize(input: any) {
        Object.assign(this, input);
        this.lugar = new Lugar(0, 0, '', '', '', '', '', '', '').deserialize(input.lugar);
        this.persona = new Representante(0,'','','','','','').deserialize(input.representante);
        return this;
    }

}
