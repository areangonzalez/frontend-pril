import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let testUser = { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };
        let destinatario: any[] = JSON.parse(localStorage.getItem('destinatario')) || [{ nro_documento:'33476725', apellido: 'González', nombre: 'Carlos', direccion: 'alberdi 123', telefono: '2920423000', celular: '2920635572', profesion: 'Panadero', oficio: 'Pastelero', nivel_educativo: 'Terciario', presentacion: '19/06/2018', id: 1 }];
        let profesion: any[] = [{ id: 1, nombre: 'Abogado'},{ id: 3, nombre: 'Agrónomo'},{ id: 4, nombre: 'Bacteriólogo' },{ id: 5, nombre: 'Biofísico' },
            { id: 6, nombre: 'climatologo' },{ id: 7, nombre: 'Cirujano' },{ id: 8, nombre: 'Dentista' },{ id: 9, nombre: 'Doctor' },{ id: 10, nombre: 'Enfermero' }];
        let oficio: any[] = [{ id: 1, nombre: 'Albañil' },{ id: 2, nombre: 'Arbitro' },{ id: 3, nombre: 'Banquero' },{ id: 4, nombre: 'Bailarin' },{ id: 5, nombre: 'Cantante' },
            { id: 6, nombre: 'Carpintero' },{ id: 7, nombre: 'Electricista' },{ id: 8, nombre: 'Escritor' },{ id: 9, nombre: 'Farmacéutico' },{ id: 10, nombre: 'Florista' }]
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/apimock/usuario/login') && request.method === 'POST') {
                if (request.body.username === testUser.username && request.body.password_hash === testUser.password) {
                    // if login details are valid return 200 OK with a fake jwt token
                    return of(new HttpResponse({ status: 200, body: { access_token: 'fake-jwt-token' } }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: [testUser] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // lista de destinatario
            if (request.url.endsWith('/destinatarios') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: destinatario }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // registrar destinatario
            if (request.url.endsWith('/destinatarios') && request.method === 'POST') {
                // get new user object from post body
                let newDestinatario = request.body;
                console.log("respuesta post: ",destinatario);
                // validation
                let duplicateUser = destinatario.filter(destinatario => { return destinatario.nro_documento === newDestinatario.persona.nro_documento; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'El destinatario con el nro documento:  "' + newDestinatario.persona.nro_documento + '" ya existe' } });
                }


                // save new user
                // array de la tabla
                //{ nro_documento: '33476725', apellido: 'González', nombre: 'Carlos', direccion: 'alberdi 123', telefono: '2920423000',
                // celular: '2920635572', profesion: 'Panadero', oficio: 'Pastelero', nivel_educativo: 'Terciario', presentacion: '19/06/2018', id: 1 }
                newDestinatario.id = destinatario.length + 1;
                destinatario.push({ 
                    nro_documento: newDestinatario.persona.nro_documento,
                    apellido: newDestinatario.persona.apellido,
                    nombre: newDestinatario.persona.nombre,
                    direccion: newDestinatario.persona.calle + ' ' + newDestinatario.persona.altura,
                    telefono: newDestinatario.persona.telefono,
                    celular: newDestinatario.persona.celular,
                    profesion: newDestinatario.destinatario.profesion,
                    oficio: newDestinatario.destinatario.oficio,
                    presentacion: newDestinatario.destinatario.fecha_presentacion
                });
                localStorage.setItem('destinatario', JSON.stringify(destinatario));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            /* LISTADOS */
            // profesiones
            if (request.url.endsWith('/profesions') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: profesion }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
            // oficios
            if (request.url.endsWith('/oficios') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: oficio }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // pass through any requests not handled above
            return next.handle(request);

        }))

            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};