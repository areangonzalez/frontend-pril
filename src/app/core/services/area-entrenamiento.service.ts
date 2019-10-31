import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class AreaEntrenamientoService {

    constructor(private _apiService: ApiService ) { }

    guardar(params: object, id: number) {
        if (id != 0) {
            return this._apiService.put('/area-entrenamientos/' + id, params);
        } else {
            return this._apiService.post('/area-entrenamientos', params);
        }
    }
    /**
     * @function listarAmbientesTrabajo conexion con api para obtener el listado de ambientes de trabajo
     */
     listar() {
        return this._apiService.get('/area-entrenamientos');
    }

    buscarPorId(id){
        return this._apiService.get('/area-entrenamientos/' + id);
    }

    buscar(params:any) {
      let httpParams = new HttpParams();
      httpParams = this._apiService.formatParams(httpParams, params);

      return this._apiService.get('/area-entrenamientos', params);
    }

    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      ): Observable<any>|Promise<any>|any {
        let area_entrenamientoid = route.params.area_entrenamientoid;

        if (area_entrenamientoid) {
          return this._apiService.get('/area-entrenamientos/' + parseInt(area_entrenamientoid));
        }else{
          let httpParams = new HttpParams();
          httpParams = this._apiService.formatParams(httpParams, {page:0});
          return this._apiService.get('/area-entrenamientos', httpParams);
        }
      }

}
