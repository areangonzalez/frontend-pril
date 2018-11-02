import { Injectable } from '@angular/core';
import { ApiService } from "../services/api.service";

@Injectable()
export class ProfesionService {

    constructor(private _http: ApiService) { }

    listarProfesiones() {
       return this._http.get('/profesions');
    }


}