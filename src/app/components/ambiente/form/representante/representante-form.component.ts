import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { ValidarNumero } from "../../../../shareds/validar-numero";
import { FormatObjetoAFecha } from "../../../../shareds/fechas";
// services
import { LocalidadService } from "../../../../services/localidad.service";
import { MensajesService } from "../../../../services/mensajes.service";
import { PersonaService } from "../../../../services/persona.service";

@Component({
    selector: 'datos-representante-form',
    templateUrl: './representante-form.html',
    styleUrls: ['./representante-form.css'],
    providers: [ValidarNumero, FormatObjetoAFecha]
})
export class RepresentanteFormComponent implements OnInit {
    @Input("group") public datosPersona: FormGroup;
    @Input("submitted") public submitted: boolean;
    @Input("mostrarBtnBusqueda") public mostrarBtnBusqueda: boolean;
    public existeRepresentante: boolean = false;
    constructor(
        private _validarNumero: ValidarNumero,
        private _formatFecha: FormatObjetoAFecha,
        private _localidadService: LocalidadService,
        private _personaService: PersonaService,
        private _mensajeService: MensajesService
    ) { }

    ngOnInit() {
    }

    get persona() { return this.datosPersona.controls; }

    /**
     * @function esNumeroDocuemnto funcion que sirve para escribir solo números
     * @param event evento que toma el objeto de el input
     */
    esNumeroDocumento(event: any) {
        let nro_docuemnto = this.datosPersona.controls.nro_documento.value;
        if (!this._validarNumero.onKey(event)) {
            this.datosPersona.controls.nro_documento.setValue(nro_docuemnto.substring(0, nro_docuemnto.length - 1));
        }
    }

    public representante: any = {};
    private validarRepresentantePorDocumento(nroDocumento) {
        this._personaService.personaPorNroDocumento(nroDocumento).subscribe(
            datos => {
                this.representante = datos;
                this.existeRepresentante = true;
            }, error => {
                this._mensajeService.cancelado(error, '');
            }
        )
    }
}
