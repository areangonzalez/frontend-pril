import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { httpOptions } from "./http-options.service";

@Injectable()
export class TipoAmbienteTrabajoService {
    private url: string = environment.baseUrl;

    constructor(private _http: HttpClient) { }

    listado() {
        return this._http.get(this.url + '/tipo-ambiente-trabajos');
    }


}
