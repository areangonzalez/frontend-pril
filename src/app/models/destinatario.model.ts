export interface IDestinatario {
    origen: number,
    fechaPresentacion: object,
    fecha_presentacion: string,
    deseo_actividad: string,
    deseo_lugar_entrenamiento: string,
    profesion: number,
    oficio: number,
    experiencia_laboral: boolean,
    conocimientos_basicos: string
}

export class Destinatario implements IDestinatario {

    constructor(
        public origen: number,
        public fechaPresentacion: object,
        public fecha_presentacion: string,
        public deseo_actividad: string,
        public deseo_lugar_entrenamiento: string,
        public profesion: number,
        public oficio: number,
        public experiencia_laboral: boolean,
        public conocimientos_basicos: string
    ){}

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}