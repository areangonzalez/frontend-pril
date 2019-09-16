import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class GeneroService {

    constructor(private _apiService: ApiService) { }

    listado() {
        return this._apiService.get('/generos');
    }

    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      ): Observable<any>|Promise<any>|any {
          return this._apiService.get('/sexos');
      }
}
