import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { httpOptions } from "../services/http-options.service";

@Injectable()
export class AmbienteTrabajoService {
    private url: string = environment.baseUrl;

    constructor(private _http: HttpClient) { }

    guardar(params: object, id: number) {
        if (id != 0) {
            return this._http.put(this.url + '/ambiente-trabajos/' + id, params, httpOptions);
        } else {
            //return this._http.post(this.url + '/ambiente-trabajos', params, httpOptions);
        }
    }

    



}