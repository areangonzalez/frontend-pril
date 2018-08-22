export class Estudio {
    constructor(
        public nivel_educativoid: number,
        public completo: string,
        public en_curso: string,
        public titulo: string
    ) { }

    deserialize(input: Estudio) {
        Object.assign(this, input);
        return this;
    }
}