import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { ValidarNumero } from "../../../../shareds/validar-numero";
import { FormatObjetoAFecha } from "../../../../shareds/fechas";


@Component({
    selector: 'datos-persona-form',
    templateUrl: './datos-persona.html',
    styleUrls: ['./datos-persona.css'],
    providers: [ValidarNumero, FormatObjetoAFecha]
})
export class DatosPersonaComponent implements OnInit {
    @Input("group") public datosPersona: FormGroup;
    
    constructor(
        private _validarNumero: ValidarNumero,
        private _formatFecha: FormatObjetoAFecha
    ){}

    ngOnInit(){
    }
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

    formatFechaNacimiento(obj:any){
        this.datosPersona.controls.fecha_nacimiento.setValue(this._formatFecha.onChange(obj));
    }
}
