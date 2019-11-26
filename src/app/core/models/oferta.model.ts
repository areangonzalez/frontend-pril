import { Lugar } from "./lugar.model";

export interface IOferta {
    id: number,
    ambienteid: number,
    nombre_sucursal: string,
    puesto: string,
    area: string,
    demanda_laboral: string,
    objetivo: string,
    lugar: Lugar,
    fecha_inicial?:string,
    ambiente_trabajo?: string
}

export class Oferta implements IOferta {

    constructor(
        public id: number,
        public ambienteid: number,
        public nombre_sucursal: string,
        public puesto: string,
        public area: string,
        public demanda_laboral: string,
        public objetivo: string,
        public lugar: Lugar,
        public fecha_inicial: string,
        public ambiente_trabajo?:string
    ) { }

    deserialize(input: any) {
        Object.assign(this, input);
        this.lugar = new Lugar(0, 0, '', '', '', '', '', '', '').deserialize(input.lugar);
        return this;
    }

}
