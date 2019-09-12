import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "../shared/breadcrumbs/breadcrumbs.service";
import { LoaderService } from '../shared/loader';


@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, AfterViewInit {

    public hoverDes = false;
    public hoverAt = false;
    public hoverAe = false;

    constructor(private breadcrumbsService: BreadcrumbsService, private _router: Router, private _loaderService: LoaderService) {
    }

    ngOnInit() {
        this.breadcrumbsService.store([{ label: 'Inicio', url: 'inicio', params: [] }]);
    }

    ngAfterViewInit(){
      setTimeout(() => {
        this._loaderService.hide();
      }, 500);
    }


    irA(url){
        this._router.navigate([url]);
    }
}
