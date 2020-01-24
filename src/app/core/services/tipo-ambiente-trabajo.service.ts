import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class TipoAmbienteTrabajoService {

    constructor(private _apiService: ApiService) { }
    /**
     * Obtiene el listado de tipos de ambientes desde el servidor
     */
    listado() {
        return this._apiService.get('/tipo-ambiente-trabajos');
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
     * borrado de un elemento por su id
     * @param id identificador del elemento
     */
    borrar(id:number) {
      return this._apiService.delete('/oficios/' + id);
    }

    /**
     * Realizamos la precarga de datos
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        ): Observable<any>|Promise<any>|any {
            return this._apiService.get('/tipo-ambiente-trabajos');
        }


}
