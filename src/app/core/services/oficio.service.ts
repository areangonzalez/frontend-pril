import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class OficioService {

    constructor(private _apiService: ApiService) { }

    listarOficios() {
        return this._apiService.get('/oficios');
    }

    guardar(params:any, id:number) {
      if (id !== 0) {
        // edito
        return this._apiService.put('/oficios/' + id, params);
      }else{
        // creo
        return this._apiService.post('/oficios', params);
      }
    }

    porId(id:number) {
      return this._apiService.get('/oficios/' + id);
    }

    borrar(id:number) {
      return this._apiService.delete('/oficios/' + id);
    }

    /**
     * Datos precargados en el ruteo de la aplicación
     */
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      ): Observable<any>|Promise<any>|any {
          return this._apiService.get('/oficios');
      }
}
