import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class NivelEducativoService {

    constructor(private _apiService: ApiService) { }

    listado() {
        return this._apiService.get('/nivel-educativos');
    }

    /**
     * Datos precargados en el ruteo de la aplicación
     */
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      ): Observable<any>|Promise<any>|any {
          return this._apiService.get('/nivel-educativos');
      }
}
