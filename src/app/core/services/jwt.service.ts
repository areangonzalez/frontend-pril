import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

    getToken() {
        return JSON.parse(localStorage.getItem('token-pril'));
    }

    saveToken(userpril: object) {
        localStorage.setItem('token-pril', JSON.stringify({ userpril }));
    }

    destroyToken() {
        localStorage.removeItem('token-pril');
    }

}
