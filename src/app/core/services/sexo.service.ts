import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { ApiService } from "./api.service";

@Injectable()
export class SexoService {

    constructor(private _apiService: ApiService) { }

    listado() {
        return this._apiService.get('/sexos');
    }

    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      ): Observable<any>|Promise<any>|any {
          return this._apiService.get('/sexos');
      }



}
