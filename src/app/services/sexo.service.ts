import { Injectable } from '@angular/core';
import { ApiService } from "../services/api.service";

@Injectable()
export class SexoService {

    constructor(private _http: ApiService) { }

    listado() {
        return this._http.get('/sexos');
    }


}