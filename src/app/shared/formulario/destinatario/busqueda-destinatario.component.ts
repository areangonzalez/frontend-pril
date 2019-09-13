import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'destinatario-busqueda',
    templateUrl: './busqueda-destinatario.html',
    styleUrls: ['./busqueda-destinatario.css']
})
export class BusquedaDestinatarioComponent {
    //title = 'app';
    public isCollapsed = true;

    constructor(
        private _router: Router
    ){}

    //model: NgbDateStruct;
    //date: { year: number, month: number };

    /* agregarDestinatario(){
        this._router.navigate(['./agregar']);
    } */
}
