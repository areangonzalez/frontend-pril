import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { httpOptions } from "../services/http-options.service";

@Injectable()
export class DestinatarioService {
    private url: string = environment.baseUrl;

    constructor(private _http: HttpClient) { }

    guardar(params:object,id:number) {
        if (id != 0) {
            return this._http.put(this.url + '/destinatarios/' + id, params, httpOptions);
        }else{
            return this._http.post(this.url + '/destinatarios', params, httpOptions);
        }
    }

    listarDestinatario() {
        return this._http.get(this.url + '/destinatarios');
    }

    destinatarioPorId(id, modificar:boolean = false){
        let param = (modificar == true)?'true':'false';
        let options = { headears: httpOptions, params: new HttpParams().set('modificar', param ) };
        return this._http.get(this.url + '/destinatarios/' + id, options);
    }


    
}