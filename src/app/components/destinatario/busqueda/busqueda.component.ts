import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'destinatario-busqueda',
    templateUrl: './busqueda.component.html',
    styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
    //title = 'app';
    public isCollapsed = true;

    //model: NgbDateStruct;
    //date: { year: number, month: number };
}