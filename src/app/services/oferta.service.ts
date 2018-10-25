import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { httpOptions } from "../services/http-options.service";

@Injectable()
export class OfertaService {
    private url: string = environment.baseUrl;

    constructor(private _http: HttpClient) { }

    listarOfertas(idAmbiente) {
        let options = { headears: httpOptions, params: new HttpParams().set('ambienteid', idAmbiente) };
        return this._http.get(this.url + '/ofertas', options);
    }

    getOfertaPorId(id: number) {
        return this._http.get(this.url + '/ofertas/' + id);
    }

    guardar(params: object, id: number) {
        if (id != 0) {
            return this._http.put(this.url + '/ofertas/' + id, params, httpOptions);
        } else {
            return this._http.post(this.url + '/ofertas', params, httpOptions);
        }
    }


}   