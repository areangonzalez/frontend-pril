import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from "./api.service";

@Injectable()
export class LocalidadService {

    constructor(private _http: ApiService) { }

    listado() {
        //let options = { headears: httpOptions, params: new HttpParams().set('modificar', '16') };
        let params = new HttpParams().set('provinciaid', '16');

        return this._http.get('/localidads', params);
    }


}