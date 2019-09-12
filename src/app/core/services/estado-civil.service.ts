import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";

@Injectable()
export class EstadoCivilService {

    constructor(private _http: ApiService) { }

    listado() {
        return this._http.get('/estado-civils');
    }


}
