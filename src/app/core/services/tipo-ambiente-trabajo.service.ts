import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class TipoAmbienteTrabajoService {

    constructor(private _apiService: ApiService) { }

    listado() {
        return this._apiService.get('/tipo-ambiente-trabajos');
    }


}
