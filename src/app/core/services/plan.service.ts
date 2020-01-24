import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class PlanService {

    constructor(private _apiService: ApiService ) { }

    /**
     * @function listar conexion con api para obtener el listado de planes
     */
     listar() {
        return this._apiService.get('/plans');
    }
    /**
     * Crea/modifica los datos en el servidor
     * @param params parametros utilizados para crear o modficar
     * @param id identificador del objeto
     */
    guardar(params:any, id:number) {
      if (id !== 0) {
        // edito
        return this._apiService.put('/plans/' + id, params);
      }else{
        // creo
        return this._apiService.post('/plans', params);
      }
    }
    /**
     * borrado de un elemento por su id
     * @param id identificador del elemento
     */
    borrar(id:number) {
      return this._apiService.delete('/plans/' + id);
    }
    /**
     * Realizamos la precarga de datos
     */
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      ): Observable<any>|Promise<any>|any {

        return this._apiService.get('/plans');
      }
}
