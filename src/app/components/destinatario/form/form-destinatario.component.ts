import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbsService } from '../../breadcrumbs/breadcrumbs.service';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";

@Component({
    selector: 'destinatario-form',
    templateUrl: './form-destinatario.component.html',
    styleUrls: ['./form-destinatario.component.css'] 
})
export class FormDestinatarioComponent implements OnInit {
    /**
     * @param breadcrumbs Array que contiene el camino de las paginas accedidas.
     */
    //breadcrumbs = ;
    destinatarioForm: FormGroup;

    constructor(
        private _router:Router,
        private _breadcrumbsService: BreadcrumbsService,
        private _fb: FormBuilder
    ){
        this.destinatarioForm = _fb.group({
            persona: _fb.group({
                nro_documento: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
                cuil: '',
                cuil_prin: ['', Validators.required],
                cuil_ult: ['', Validators.required],
                apellido: ['', Validators.required],
                nombre: ['', Validators.required],
                fecha_nacimiento: ['', Validators.required],
                sexoid: [0, Validators.required],
                generoid: [0, Validators.required],
                estado_civilid: [0, Validators.required],
                telefono: '',
                celular: '',
                email: ['', Validators.required],
                localidadid: [0, Validators.required],
                calle: ['', Validators.required],
                altura: ['', Validators.required],
                barrio: ['', Validators.required],
                piso: '',
                departamento: '',
                nivel_educativoid: [0, Validators.required],
                completo: 0,
                en_curso: 0,
                titulo: ['', Validators.required]
            }),
            destinatario: _fb.group({

            })
        });
    }

    ngOnInit() {
        // breadcrumbs Dinamico
        this._breadcrumbsService.store([{ label: 'Inicio', url: 'inicio', params: [] }, { label: 'Destinatario', url: 'destinatario', params: [] }, { label: 'Agregar', url: 'destinatario/agregar', params: [] }]);
    }

    volver() {
        this._router.navigate(['destinatario']);
    }

}