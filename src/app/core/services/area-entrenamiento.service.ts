import { Injectable } from '@angular/core';
import { ApiService } from "../services/api.service";

@Injectable()
export class AreaEntrenamientoService {

    constructor(private _apiServcie: ApiService ) { }

    guardar(params: object, id: number) {
        if (id != 0) {
            return this._apiServcie.put('/area-entrenamientos/' + id, params);
        } else {
            return this._apiServcie.post('/area-entrenamientos', params);
        }
    }
    /**
     * @function listarAmbientesTrabajo conexion con api para obtener el listado de ambientes de trabajo
     */
     listar() {
        return this._apiServcie.get('/area-entrenamientos');
    }

    buscarPorId(id){
        return this._apiServcie.get('/area-entrenamientos/' + id);
    }
}
