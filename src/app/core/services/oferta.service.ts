import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from "./api.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class OfertaService {

    constructor(private _apiService: ApiService) { }

    listarOfertas(idAmbiente = '') {
      if (idAmbiente != ''){
        let params = new HttpParams().set('ambiente_trabajoid', idAmbiente);
        return this._apiService.get('/ofertas', params);
      }else{
        return this._apiService.get('/ofertas');
      }
    }

    getOfertaPorId(id: number) {
        return this._apiService.get('/ofertas/' + id);
    }

    guardar(params: object, id: number) {
        if (id != 0) {
            return this._apiService.put('/ofertas/' + id, params);
        } else {
            return this._apiService.post('/ofertas', params);
        }
    }

    buscarOfertaPor(params: object) {
      let httpParams = new HttpParams();
      for (const key in params) {
        httpParams = httpParams.append(key.toString(), params[key].toString());
      }
      return this._apiService.get('/ofertas', httpParams);
    }

    /**
     * Realizamos la precarga de datos
     */
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      ): Observable<any>|Promise<any>|any {
        let ofertaid = route.params.ofertaid;
        let ambienteid = route.params.ambienteid;
        if(ofertaid) {
          return this._apiService.get('/ofertas/' + parseInt(ofertaid));
        }else if(ambienteid) {
          let httpParams = new HttpParams();
          httpParams = this._apiService.formatParams(httpParams, {ambiente_trabajoid:ambienteid});
          return this._apiService.get('/ofertas', httpParams);
        }else{
          return this._apiService.get('/ofertas');
        }
      }

}
