import { Deserializable } from "./desearializable.model";

interface datosPersona {
    nombre: string;
    apellido: string;
    documento: string;
    cuil: string;    
};
// A la clase persona le implemento dos interfaces.
export class Persona implements Deserializable, datosPersona {

    constructor(
        public nombre: string,
        public apellido: string,
        public documento: string,
        public cuil: string,
    ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.documento = documento;
        this.cuil = cuil;
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}