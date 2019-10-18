import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class DestinatarioService {

    constructor(private _apiService: ApiService ) { }

    guardar(params:object,id:number) {
        if (id != 0) {
            return this._apiService.put('/destinatarios/' + id, params);
        }else{
            return this._apiService.post('/destinatarios', params);
        }
    }

    listarDestinatario() {
        return this._apiService.get('/destinatarios');
    }

    destinatarioPorId(id){
        return this._apiService.get('/destinatarios/' + id);
    }

    buscar(params:any) {
      let httpParams = new HttpParams();
      httpParams = this._apiService.formatParams(httpParams, params);

      return this._apiService.get('/destinatarios', params);
    }

    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      ): Observable<any>|Promise<any>|any {
        let destinatarioId = route.params.id;
        if(destinatarioId){
          return this._apiService.get('/destinatarios/' + parseInt(destinatarioId));
        }else{
          let httpParams = new HttpParams();
          httpParams = this._apiService.formatParams(httpParams, {page:0});
          return this._apiService.get('/destinatarios', httpParams);
        }
      }

}
