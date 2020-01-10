import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthenticationService } from 'src/app/core/services';

@Component({
    selector: 'app-menu-admin',
    templateUrl: './menu-admin.component.html',
    styleUrls: ['./menu-admin.css']
})
export class MenuAdminComponent implements OnInit {
    public isCollapsed = true;

    constructor(
       private _router: Router,
       private _authentication: AuthenticationService

    ){}

    ngOnInit(){
    }
}
