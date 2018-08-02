import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";

@Component({
    selector: 'estudio-form',
    templateUrl: './estudio.html',
    styleUrls: ['./estudio.css'],
})
@Injectable()
export class EstudioComponent implements OnInit {
    //@Input("listaEstudios") public listaEstudios;

    /**
     * @var estudiosForm variable que contiene el formulario de estudios
     */
    estudiosForm: FormGroup;


    /**
     * @param _router Servicio para la navegacion dentro del sistema
     * @param _fb Servicio para armar el formulario de estudios
     */
    constructor(
        private _router: Router,
        private _fb: FormBuilder
    ) { 
        this.estudiosForm = _fb.group({
            nivel_educativoid: ['', Validators.required],
            completo: '',
            en_curso: '',
            titulo: ['', [Validators.required, Validators.minLength(3)]]
        })
    }

    ngOnInit() { }

    /* crearEstudios(): FormGroup {
        this._fb.group({
            nivel_educativoid: ['', Validators.required],
            completo: '',
            en_curso: '',
            titulo: ['', [Validators.required, Validators.minLength(3)]]
        });  
    } */
}