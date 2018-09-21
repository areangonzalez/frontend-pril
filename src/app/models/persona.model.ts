import { map } from 'rxjs/operators';
import { Lugar } from "./lugar.model";
import { Estudio } from "./estudio.model";

export class Persona {

    constructor(
        public id: number,
        public nro_documento: string,
        public cuil: string,
        public apellido: string,
        public nombre: string,
        public fecha_nacimiento: string,
        public sexoid: number,
        public generoid: number,
        public estado_civilid: number,
        public telefono: string,
        public celular: string,
        public email: string,
        public lugar: Lugar,
        public estudios: Array<Estudio>
    ){}

    deserialize(input: Persona) {
        Object.assign(this, input);
        this.lugar = new Lugar(0,0,'','','','','','',false).deserialize(input.lugar);
        this.estudios.map((estudio: Estudio) => new Estudio(0,'','','','').deserialize(estudio));
        return this;
    }
}
