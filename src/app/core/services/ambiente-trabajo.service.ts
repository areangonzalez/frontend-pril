import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AmbienteTrabajoService {

    constructor(private _apiService: ApiService ) { }

    guardar(params: object, id: number) {
        if (id != 0) {
            return this._apiService.put('/ambiente-trabajos/' + id, params);
        } else {
            return this._apiService.post('/ambiente-trabajos', params);
        }
    }
    /**
     * @function listarAmbientesTrabajo conexion con api para obtener el listado de ambientes de trabajo
     */
    listarAmbienteTrabajo() {
        return this._apiService.get('/ambiente-trabajos');
    }

    ambientePorId(id){
        return this._apiService.get('/ambiente-trabajos/' + id);
    }

    /**
     * Realizamos la precarga de datos
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        ): Observable<any>|Promise<any>|any {
          let ambienteid = route.params.ambienteid;//parametro instaciada desde el routing
          if(ambienteid){
            return this._apiService.get('/ambiente-trabajos/' + parseInt(ambienteid));
          }else{
            return this._apiService.get('/ambiente-trabajos');
          }
        }
}
