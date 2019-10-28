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
     * Realizamos la precarga de datos
     */
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      ): Observable<any>|Promise<any>|any {

        return this._apiService.get('/plans');
      }
}
