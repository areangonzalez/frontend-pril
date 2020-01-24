import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class OficioService {

    constructor(private _apiService: ApiService) { }

    /**
     * obtiene el listado desde el servidor
     */
    listarOficios() {
        return this._apiService.get('/oficios');
    }

    /**
     * Crea/modifica los datos en el servidor
     * @param params parametros utilizados para crear o modficar
     * @param id identificador del objeto
     */
    guardar(params:any, id:number) {
      if (id !== 0) {
        // edito
        return this._apiService.put('/oficios/' + id, params);
      }else{
        // creo
        return this._apiService.post('/oficios', params);
      }
    }
    /**
     * busqueda de un objeto por su id
     * @param id identificador del elemento
     */
    porId(id:number) {
      return this._apiService.get('/oficios/' + id);
    }
    /**
     * borrado de un elemento por su id
     * @param id identificador del elemento
     */
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
