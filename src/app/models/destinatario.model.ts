import { Persona } from "./persona.model";
import { Lugar } from "./lugar.model";

export interface IDestinatario {
    origen: string,
    fechaPresentacion: object,
    fecha_presentacion: string,
    deseo_actividad: string,
    deseo_lugar_entrenamiento: string,
    profesionid: number,
    oficioid: number,
    experiencia_laboral: boolean,
    conocimientos_basicos: string
    banco_nombre: string,
    banco_cbu: string,
    banco_alias: string,
    legajo: string,
    persona: Persona
}

export class Destinatario implements IDestinatario {
  public lugar: Lugar;
    constructor(
        public origen: string,
        public fechaPresentacion: object,
        public fecha_presentacion: string,
        public deseo_actividad: string,
        public deseo_lugar_entrenamiento: string,
        public profesionid: number,
        public oficioid: number,
        public experiencia_laboral: boolean,
        public conocimientos_basicos: string,
        public banco_nombre: string,
        public banco_cbu: string,
        public banco_alias: string,
        public legajo: string,
        public persona: Persona
    ){}

    deserialize(input: any) {
        Object.assign(this, input);
        this.lugar = new Lugar(0,0,'','','','','','','').deserialize(input.lugar);
        this.persona = new Persona(0,'','','','','',0,0,0,'','','',this.lugar, []).deserialize(input.persona);
        return this;
    }

}
