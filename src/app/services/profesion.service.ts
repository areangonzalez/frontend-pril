import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { httpOptions } from "../services/http-options.service";

@Injectable()
export class ProfesionService {
    private url: string = environment.baseUrl;

    constructor(private _http: HttpClient) { }

    listarProfesiones() {
       return this._http.get(this.url + '/profesions');
    }


}