import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from "./api.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class LocalidadService {

    constructor(private _apiService: ApiService) { }

    listado() {
        //let options = { headears: httpOptions, params: new HttpParams().set('modificar', '16') };
        let params = new HttpParams().set('provinciaid', '16');

        return this._apiService.get('/localidads', params);
    }

    /**
     * Realizamos la precarga de datos
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        ): Observable<any>|Promise<any>|any {
            return this._apiService.get('/localidads');
        }
}
