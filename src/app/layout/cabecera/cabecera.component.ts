import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


@Component({
    selector: 'app-cabecera',
    templateUrl: './cabecera.component.html',
    styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
    //title = 'app';

    constructor(
       private _router: Router
    ){}

    ngOnInit(){

    }

    /* listarDestinatario(){
        this._router.navigate(['destinatario']);
    }

    agregarDestinatario(){
        console.log('click');
        this._router.navigate(['./destinatario','agregar']);
    } */
}
