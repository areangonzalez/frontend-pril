import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    //styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    /* public hoverDes = false;
    public hoverAt = false;
    public hoverAe = false; */

    constructor(
        private _router: Router,
      ) {
    }

    ngOnInit() {
    }

    /* irA(url){
        this._router.navigate([url]);
    } */
}
