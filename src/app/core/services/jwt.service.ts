import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

    getToken() {
        return JSON.parse(localStorage.getItem('token-pril'));
    }

    saveToken(datosToken: object) {
        localStorage.setItem('token-pril', JSON.stringify({ datosToken }));
    }

    destroyToken() {
        localStorage.removeItem('token-pril');
    }

}
