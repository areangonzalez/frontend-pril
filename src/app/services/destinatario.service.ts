import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable()
export class DestinatarioService {
    //private url: string = environment.baseUrl + '/destinarios';
    private url: string = '/api/destinatarios';

    constructor(private _http: HttpClient) { }

    guardar(datos) {
        return this._http.post('/crear', datos);
    }

    listarDestinatario() {
        return this._http.get(this.url + '/lista');
    }

    
}