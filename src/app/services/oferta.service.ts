import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from "../services/api.service";


@Injectable()
export class OfertaService {

    constructor(private _http: ApiService) { }

    listarOfertas(idAmbiente = '') {
      if (idAmbiente != ''){
        let params = new HttpParams().set('ambienteid', idAmbiente);
        return this._http.get('/ofertas', params);
      }else{
        return this._http.get('/ofertas');
      }
    }

    getOfertaPorId(id: number) {
        return this._http.get('/ofertas/' + id);
    }

    guardar(params: object, id: number) {
        if (id != 0) {
            return this._http.put('/ofertas/' + id, params);
        } else {
            return this._http.post('/ofertas', params);
        }
    }

    buscarOfertaPor(params: object) {
      let parametros = new HttpParams(params);
      return this._http.get('/ofertas', parametros);
    }

}
