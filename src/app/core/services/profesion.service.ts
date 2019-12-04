import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ProfesionService {

    constructor(private _apiService: ApiService) { }

    listarProfesiones() {

       return this._apiService.get('/profesions');
    }

    buscarPorNombre(nombre:string) {
      //let httpParams = new HttpParams();
      let httpParams = new HttpParams();
      httpParams = this._apiService.formatParams(httpParams, {'nombre':nombre});

      return this._apiService.get('/profesions', httpParams);
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
