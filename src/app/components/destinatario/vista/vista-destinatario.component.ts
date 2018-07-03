import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "../../breadcrumbs/breadcrumbs.service";

@Component({
    selector: 'destinatario-vista',
    templateUrl: './vista-destinatario.html',
    styleUrls: ['./vista-destinatario.css'] 
})
export class VistaDestinatarioComponent {
    //title = 'app';

    constructor(
        private _router: Router,
        private _breadcrumbsService: BreadcrumbsService
    ){}

    ngOnInit() {
        // breadcrumbs Dinamico
        this._breadcrumbsService.store([{ label: 'Inicio', url: 'inicio', params: [] }, { label: 'Destinatario', url: 'destinatario', params: [] }, { label: 'Ver', url: 'destinatario/vista', params: [] }]);
    }

    volver() {
        this._router.navigate(['destinatario']);
    }

}
 