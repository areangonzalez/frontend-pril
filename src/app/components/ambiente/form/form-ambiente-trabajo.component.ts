import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbsService } from '../../breadcrumbs/breadcrumbs.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// services
import { MensajesService } from "../../../services/mensajes.service";

@Component({
    selector: 'destinatario-form',
    templateUrl: './form-ambiente-trabajo.html',
    styleUrls: ['./form-ambiente-trabajo.css'],
})
@Injectable()
export class FormAmbienteTrabajoComponent implements OnInit {
    /**
     * @var ambienteForm contiene el array del formulario
     * @var mostrarBtnBusqueda muestra el boton de busqueda por numero documento
     * @var submitted muestra los errores en el formulario
     */
    public ambienteForm: FormGroup;
    public mostrarBtnBusqueda: boolean = true;
    public submitted: boolean = false;
    /**
     * Inicializa los servicios
     * @param _router manejo de rutas dentro del componente
     * @param _breadcrumbsService maneja el camino del cliente por el sistema
     * @param _fb formBuilder servicio para crear el formulario
     */
    constructor(
        private _router: Router,
        private _breadcrumbsService: BreadcrumbsService,
        private _fb: FormBuilder
    ) {
       this.ambienteForm = _fb.group({
            persona: _fb.group({
                id: 0,
                nro_documento: ['', [Validators.required, Validators.minLength(7)]],
                apellido: ['', [Validators.required, Validators.minLength(3)]],
                nombre: ['', [Validators.required, Validators.minLength(3)]],
                telefono: '',
                celular: '',
                fax: '',
                email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
                lugar: _fb.group({
                    id: 0,
                    localidadid: ['', Validators.required],
                    calle: ['', [Validators.required, Validators.minLength(3)]],
                    altura: ['', Validators.required],
                    barrio: ['', [Validators.required, Validators.minLength(3)]],
                    piso: '',
                    depto: '',
                    escalera: ''
                })
            }),
            ambiente: _fb.group({
                id: 0,
                nombre: ['', [Validators.required, Validators.minLength(3)]],
                legajo: ['', Validators.required],
                observacion: '',
                cuit: ['', [Validators.required, Validators.minLength(3)]],
                actividad: ['', [Validators.required, Validators.minLength(5)]],
                tipo_ambiente_trabajoid: ['', Validators.required]
            })
        }); 
    }

    ngOnInit() {
        // breadcrumbs Dinamico
        this._breadcrumbsService.store([{ label: 'Inicio', url: 'inicio', params: [] }, { label: 'Ambiente de trabajo', url: 'ambiente', params: [] }, { label: 'Agregar', url: 'ambiente/agregar', params: [] }]);
    }
    /**
     * @function volver Vuelve a la vista del listado de ambiente de trabajo
     */
    volver() {
        this._router.navigate(['ambiente']);
    }

    GuardarAmbiente() {
        this.submitted = true;
        if (this.ambienteForm.invalid) {
            return;
        }
    }
    

}