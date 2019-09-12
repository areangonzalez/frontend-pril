import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";

@Injectable()
export class PlanService {

    constructor(private _apiServcie: ApiService ) { }

    /**
     * @function listar conexion con api para obtener el listado de planes
     */
     listar() {
        return this._apiServcie.get('/plans');
    }
}
