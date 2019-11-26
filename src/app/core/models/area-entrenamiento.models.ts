import { Destinatario } from "./destinatario.model";
import { Lugar } from "./lugar.model";
import { Oferta } from "./oferta.model";
export interface IAreaEntrenamiento {
    id: number,
    tarea: string,
    planid: number,
    destinatarioid: number,
    ofertaid: number,
    fechaInicial: object,
    fecha_inicial: string,
    fecha_final: string,
    descripcion_baja: string,
    jornada: string,
    observacion: string,
    plan: string,
    ambiente_trabajo: string,
    destinatario: Destinatario,
    oferta: Oferta,
    estado?: string
}

export class AreaEntrenamiento implements IAreaEntrenamiento {

    constructor(
      public id: number,
      public tarea: string,
      public planid: number,
      public destinatarioid: number,
      public ofertaid: number,
      public fechaInicial: object,
      public fecha_inicial: string,
      public fecha_final: string,
      public descripcion_baja: string,
      public jornada: string,
      public observacion: string,
      public plan: string,
      public ambiente_trabajo: string,
      public destinatario: Destinatario,
      public oferta: Oferta,
      public estado?: string

    ){}

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}
