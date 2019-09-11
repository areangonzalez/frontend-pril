import { Injectable } from '@angular/core';
import { ApiService } from "../services/api.service";

@Injectable()
export class OficioService {

    constructor(private _http: ApiService) { }

    listarOficios() {
        return this._http.get('/oficios');
    }


}