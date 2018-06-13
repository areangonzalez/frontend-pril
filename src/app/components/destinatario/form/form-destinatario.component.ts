import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'destinatario-form',
    templateUrl: './form-destinatario.component.html',
    styleUrls: ['./form-destinatario.component.css'] 
})
export class FormDestinatarioComponent {
    //title = 'app';

    constructor(
        private _router:Router
    ){}

    volver() {
        this._router.navigate(['destinatario']);
    }
}