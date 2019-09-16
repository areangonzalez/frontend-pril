import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';


@Injectable()
export class PersonaService {

    constructor(private _apiService: ApiService) { }

    personaPorNroDocumento(nro_documento) {
      let httpParams = new HttpParams();
      httpParams = this._apiService.formatParams(httpParams, {'nro_documento':nro_documento})
        return this._apiService.get('/personas', httpParams);
    }



}
