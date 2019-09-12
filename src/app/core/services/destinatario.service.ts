import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";

@Injectable()
export class DestinatarioService {

    constructor(private _apiServcie: ApiService ) { }

    guardar(params:object,id:number) {
        if (id != 0) {
            return this._apiServcie.put('/destinatarios/' + id, params);
        }else{
            return this._apiServcie.post('/destinatarios', params);
        }
    }

    listarDestinatario() {
        return this._apiServcie.get('/destinatarios');
    }

    destinatarioPorId(id){
        return this._apiServcie.get('/destinatarios/' + id);
    }



}
