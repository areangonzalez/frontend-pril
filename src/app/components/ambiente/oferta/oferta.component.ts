import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "../../breadcrumbs/breadcrumbs.service";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";

@Component({
    selector: 'ambiente-trabajo-oferta',
    templateUrl: './oferta.html',
    styleUrls: ['./oferta.css']
})
export class OfertaComponent implements OnInit {
    private oferta: FormGroup;
    constructor(
        private breadcrumbsService: BreadcrumbsService,
        private _router: Router,
        private _fb: FormBuilder,
    ) {
        this.oferta = _fb.group({
            nombre_sucursal: ['', [Validators.required, Validators.minLength(3)]],
            puesto: ['', [Validators.required, Validators.minLength(3)]],
            area: ['', [Validators.required, Validators.minLength(3)]],
            demanda_laboral: ['', [Validators.required, Validators.minLength(8)]],
            objetivo: '',
            dia_horario: ['', [Validators.required, Validators.minLength(5)]],
            tarea: ['', [Validators.required, Validators.minLength(8)]],
            // lugar
            localidadid: ['', Validators.required],
            calle: ['', [Validators.required, Validators.minLength(3)]],
            altura: ['', Validators.required],
            barrio: '',
            depto: '',
            piso: '',
            telefono: ['', Validators.required],
            celular: '', 
            fax: '',
            email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
        }); 
    }

    ngOnInit() {
        this.breadcrumbsService.store([
            { label: 'Inicio', url: 'inicio', params: [] },
            { label: 'Ambiente de trabajo', url: 'ambiente', params: [] },
            { label: 'Agregar oferta', url: 'ambiente/oferta/agregar', params: [] }
        ]);
    }

}
