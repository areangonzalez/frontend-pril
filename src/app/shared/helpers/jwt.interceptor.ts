import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from "../../core/services/jwt.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _jwtService: JwtService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
      let currentUser = this._jwtService.getToken();
      if (currentUser && currentUser.datosToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.datosToken.token}`
          }
        });
      }
      console.log("interceptor: ",request);

      return next.handle(request);
    }
}
