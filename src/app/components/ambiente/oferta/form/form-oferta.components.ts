import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'form-oferta',
    templateUrl: './form-oferta.html',
    styleUrls: ['./form-oferta.css']
})
export class FormOfertaComponent implements OnInit {
    @Input("group") public oferta: FormGroup;

    constructor(
        private _router: Router,

    ) { }

    ngOnInit() {
        // breadcrumbs Dinamico
    }

}