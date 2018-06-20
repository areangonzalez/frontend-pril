import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbsService } from '../../breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'destinatario-form',
    templateUrl: './form-destinatario.component.html',
    styleUrls: ['./form-destinatario.component.css'] 
})
export class FormDestinatarioComponent implements OnInit {
    //title = 'app';

    constructor(
        private _router:Router,
        private breadcrumbsService: BreadcrumbsService
    ){}

    ngOnInit() {
        this.breadcrumbsService.store([
            { label: 'Inicio', url: 'inicio', params: [] },
            { label: 'Destinatario', url: 'destinatario', params: [] },
            { label: 'Agregar', url: 'destinatario/agregar', params: [] }]);
    }

    volver() {
        this._router.navigate(['destinatario']);
    }
}