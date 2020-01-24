import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ProfesionService {

    constructor(private _apiService: ApiService) { }
    /**
     * Obtiene el listado de profesiones del servidor
     */
    listarProfesiones() {
      return this._apiService.get('/profesions');
    }
    /**
     * busca una profesion por nombre
     * @param nombre nombre de la profesion a buscar
     */
    buscarPorNombre(nombre:string) {
      //let httpParams = new HttpParams();
      let httpParams = new HttpParams();
      httpParams = this._apiService.formatParams(httpParams, {'nombre':nombre});

      return this._apiService.get('/profesions', httpParams);
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
     * Datos precargados en el ruteo de la aplicación
     */
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      ): Observable<any>|Promise<any>|any {
          return this._apiService.get('/profesions');
      }
}
