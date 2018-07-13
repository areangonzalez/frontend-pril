import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';

@Component({
    selector: 'area-entrenamiento-busqueda',
    templateUrl: './busqueda-area-entrenamiento.html',
    styleUrls: ['./busqueda-area-entrenamiento.css']
})
export class BusquedaAreaEntrenamientoComponent implements OnInit {
    private isCollapsed = true;

    constructor(private _router: Router) {
    }

    ngOnInit() {
    }

    agregarArea(){
        console.log('click');
        this._router.navigate(['area', 'crear-seleccion']);
    }

}