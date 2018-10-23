import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


@Component({
    selector: 'app-cabecera',
    templateUrl: './cabecera.component.html',
    styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
    public isCollapsed = true;

    constructor(
       private _router: Router
    ){}

    ngOnInit(){
    }

    cerrarSesion(){
        localStorage.removeItem('token-pril');
    }

    estoyLogueado(){
        return (localStorage.getItem('token-pril')) ? true : false;
    }
}
