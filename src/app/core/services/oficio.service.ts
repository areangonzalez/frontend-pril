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

    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      ): Observable<any>|Promise<any>|any {
          return this._apiService.get('/oficios');
      }
}
