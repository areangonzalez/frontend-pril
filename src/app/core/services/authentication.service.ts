import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { JwtService } from "./jwt.service";
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from "../models";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

    constructor(
      private _apiService: ApiService,
      private _jwtService: JwtService
    ) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token-pril')));
      this.currentUser = this.currentUserSubject.asObservable();
     }

    public get currentUserValue(): User {
      return this.currentUserSubject.value;
    }

    login(params) {
        return this._apiService.post('/usuario/login', { username: params.username, password_hash: params.password })
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response
                if (res && res.access_token) {
                  let datos: User = {
                    nombre: res.nombre,
                    username: res.username,
                    role: res.role,
                    token: res.access_token
                  };
                  this._jwtService.saveToken(datos);
                  this.currentUserSubject.next(res);
                }
            }));
    }

    logout() {
      // remove user from local storage to log user out
      this._jwtService.destroyToken();
      this.currentUserSubject.next(null);
  }

    loggedIn() {
      let userLogin = this._jwtService.getToken();
      if(userLogin && userLogin['userpril']) {
        return true;
      }else{
        return false;
      }
    }

    getUserName() {
      let userLogin = this._jwtService.getToken();

      return userLogin['userpril'].username;
    }
}
