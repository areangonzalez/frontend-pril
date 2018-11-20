import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "../../../breadcrumbs/breadcrumbs.service";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { FormatObjetoAFecha } from "../../../../shareds/fechas";


@Component({
    selector: 'area-entrenamiento-form-plan',
    templateUrl: './plan-form-area-entrenamiento.html',
    styleUrls: ['./plan-form-area-entrenamiento.css'],
    providers: [FormatObjetoAFecha]
})
export class PlanFormAreaEntrenamientoComponent implements OnInit {
    /**
     * @var areaEntrenamiento variable que contiene el objeto del formulario
     */
    areaEntrenamiento: FormGroup;

    /**
     * Constructor
     * @param breadcrumbsService servicio para el manejo de las paginas accedidas
     * @param _router servicio para el control de navegacion dentro del sistema
     * @param _formatearFecha: funcion que otorga el formato de fecha.
     */
    constructor(
        private _breadcrumbsService: BreadcrumbsService,
        private _router: Router,
        private _fb: FormBuilder,
        private _formatearFecha: FormatObjetoAFecha
    ) {
        this.areaEntrenamiento = _fb.group({
            id: '',
            tarea: ['', [Validators.required, Validators.minLength(5)]],
            planid: ['', Validators.required],
            destinatarioid: '',
            fecha_inicial: '',
            fechaInicial: ['', Validators.required],
            descripcion_baja: '',
            ofertaid: ''
        });
    }

    ngOnInit() {
        this._breadcrumbsService.store([
            { label: 'Inicio', url: 'inicio', params: [] },
            { label: 'Área de entrenamiento', url: 'area-entrenamiento', params: [] },
            { label: 'Crear', url: 'area/crear-plan', params: [] }]);
    }

    cancelar() {
        this._router.navigate(['area']);
    }

    volver() {
        this._router.navigate(['area', 'crear-seleccion']);
    }

    formatFechaInicial(obj: any) {
        this.areaEntrenamiento.controls.fecha_inicial.setValue(this._formatearFecha.onChange(obj));
    }
}
