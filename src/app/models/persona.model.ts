import { Deserializable } from "./desearializable.model";

export class Persona implements Deserializable {

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}