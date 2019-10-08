import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class NivelEducativoService {

    constructor(private _apiService: ApiService) { }

    listado() {
        return this._apiService.get('/nivel-educativos');
    }


}
