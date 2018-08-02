import { Deserializable } from "./desearializable.model";

export class Destinatario implements Deserializable {

    constructor(){}

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}