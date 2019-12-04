import { Component, OnInit, Input, Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from "@angular/forms";
import { UtilService } from "../../../core/utils";
// services
import { LocalidadService } from "../../../core/services/localidad.service";
import { MensajesService } from "../../../core/services/mensajes.service";
import { PersonaService } from "../../../core/services/persona.service";

@Component({
    selector: 'datos-representante-form',
    templateUrl: './datos-representante-form.html',
    styleUrls: ['./datos-representante-form.css'],
    providers: [UtilService, PersonaService]
})
export class DatosRepresentanteFormComponent implements OnInit {
    /**
     * @var datosPersona contiene los datos del formulario
     * @var submitted otorga la activación de errores de los inputs del formulario
     * @var mostrarBtnBusqueda muestra el boton de busqueda por documento, si el formulario no esta en modo edición
     * @var existeRepresentante cambia los estilos del boton de busqueda por documento
     */
    @Input("group") public datosPersona: FormGroup;
    @Input("submitted") public submitted: boolean;
    @Input("mostrarBtnBusqueda") public mostrarBtnBusqueda: boolean;
    public existeRepresentante: boolean = false;

    /**
     * Inicializacion de servicios para el componente
     * @param _personaService
     * @param _mensajeService
     */
    constructor(
        private _utilService: UtilService,
        private _localidadService: LocalidadService,
        private _personaService: PersonaService,
        private _mensajeService: MensajesService
    ) { }

    ngOnInit() {
    }


    /**
     * @function esNumeroDocuemnto funcion que sirve para escribir solo números
     * @param event evento que toma el objeto de el input
     */
    esNumeroDocumento(event: any) {
        let nro_docuemnto = this.datosPersona.controls.nro_documento.value;
        if (!this._utilService.validarNumero(event)) {
            this.datosPersona.controls.nro_documento.setValue(nro_docuemnto.substring(0, nro_docuemnto.length - 1));
        }
    }

    validarRepresentantePorDocumento(nroDocumento) {
        let doc = nroDocumento;
        if (nroDocumento != '') {
            this._personaService.personaPorNroDocumento(nroDocumento).subscribe(
                respuesta => {
                    if (respuesta.length>0) {
                        let persona = respuesta[0];
                        // borro variables que no son utilizadas en el objeto
                        delete persona.estudios;
                        delete persona.lugar;
                        delete persona.fecha_nacimiento;
                        delete persona.estado_civilid;
                        delete persona.sexoid;
                        delete persona.generoid;
                        delete persona.cuil;
                        // seteo los valores en el formulario
                        this.datosPersona.patchValue(persona);
                        this.existeRepresentante = true;
                    }else{
                        this.resetForm(this.datosPersona);
                        this.datosPersona.controls.nro_documento.patchValue(doc);
                    }
                }, error => {
                    this._mensajeService.cancelado(error, [{ name: '' }]);
                }
            );
        }
    }

    // reseteo el formulario y pongo las variables en vacio
    public resetForm(formGroup: FormGroup) {
        let control: AbstractControl = null;

        // formulario reset
        formGroup.reset();
        formGroup.markAsUntouched();
        Object.keys(formGroup.controls).forEach((name) => {
            control = formGroup.controls[name];
            control.setValue('');
            control.setErrors(null);

        });
    }
}
