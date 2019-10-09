import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

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

    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      ): Observable<any>|Promise<any>|any {
        let destinatarioId = route.params.id;
        if(destinatarioId){
          return this._apiService.get('/destinatarios/' + parseInt(destinatarioId));
        }else{
          return this._apiService.get('/destinatarios');
        }
      }

}
