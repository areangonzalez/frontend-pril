import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';


@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

    public hoverDes = false;
    public hoverAt = false;
    public hoverAe = false;

    constructor(
        private _router: Router,
      ) {
    }

    ngOnInit() {
    }

    irA(url){
        this._router.navigate([url]);
    }
}
