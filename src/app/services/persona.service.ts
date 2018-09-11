import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { httpOptions } from "../services/http-options.service";

@Injectable()
export class PersonaService {
    private url: string = environment.baseUrl;

    constructor(private _http: HttpClient) { }

    personaPorNroDocumento(nro_documento) {
        let options = { headears: httpOptions, params: new HttpParams().set('nro_documento',nro_documento)};
        return this._http.get(this.url + '/personas', options);
    }



}