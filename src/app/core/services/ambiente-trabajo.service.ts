import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";

@Injectable()
export class AmbienteTrabajoService {

    constructor(private _apiServcie: ApiService ) { }

    guardar(params: object, id: number) {
        if (id != 0) {
            return this._apiServcie.put('/ambiente-trabajos/' + id, params);
        } else {
            return this._apiServcie.post('/ambiente-trabajos', params);
        }
    }
    /**
     * @function listarAmbientesTrabajo conexion con api para obtener el listado de ambientes de trabajo
     */
     listarAmbienteTrabajo() {
        return this._apiServcie.get('/ambiente-trabajos');
    }

    ambientePorId(id){
        return this._apiServcie.get('/ambiente-trabajos/' + id);
    }
}
