import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'lista-estudio',
    templateUrl: './lista-estudio.html',
    //styleUrls: ['./form-destinatario.css'],
})
@Injectable()
export class ListaEstudioComponent implements OnInit {
    @Input("listaEstudios") public listaEstudios;
    /**
     * @param _router Servicio para la navegacion dentro del sistema
     */
    constructor(
        private _router: Router,
    ) {}

    ngOnInit() {}

    /* crearEstudios(): FormGroup {
        this._fb.group({
            nivel_educativoid: ['', Validators.required],
            completo: '',
            en_curso: '',
            titulo: ['', [Validators.required, Validators.minLength(3)]]
        });  
    } */
}