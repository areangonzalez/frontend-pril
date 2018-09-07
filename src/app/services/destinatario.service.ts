import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { httpOptions } from "../services/http-options.service";

@Injectable()
export class DestinatarioService {
    private url: string = environment.baseUrl;

    constructor(private _http: HttpClient) { }

    guardar(params:object,id:number) {
        if (id != 0) {
            console.log('editar');
        }else{
            return this._http.post(this.url + '/destinatarios', params, httpOptions);
        }
    }

    listarDestinatario() {
        return this._http.get(this.url + '/destinatarios');
    }

    destinatarioPorId(id){
        return this._http.get(this.url + '/destinatarios/' + id);
    }


    
}