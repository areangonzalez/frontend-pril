import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { httpOptions } from "../services/http-options.service";

@Injectable()
export class LocalidadService {
    private url: string = environment.baseUrl;

    constructor(private _http: HttpClient) { }

    listado() {
        let options = { headears: httpOptions, params: new HttpParams().set('modificar', '16') };
        return this._http.get(this.url + '/localidads', options);
    }


}