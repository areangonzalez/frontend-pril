import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'ambiente-trabajo-busqueda',
    templateUrl: './busqueda-ambiente-trabajo.html',
    styleUrls: ['./busqueda-ambiente-trabajo.css']
})
export class BusquedaAmbienteTrabajoComponent {
    //title = 'app';
    public isCollapsed = true;

    constructor(
        private _router: Router
    ) { }


    
}