import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "../breadcrumbs/breadcrumbs.service";

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
    
    public hoverDes = false;
    public hoverAt = false;
    public hoverAe = false;

    constructor(private breadcrumbsService: BreadcrumbsService, private _router: Router) {
    }

    ngOnInit() {
        this.breadcrumbsService.store([{ label: 'Inicio', url: 'inicio', params: [] }]);
    }

    irA(url){
        this._router.navigate([url]);
    }
}
