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
    
    private cuil_medio = '';
    constructor(
        private _validarNumero: ValidarNumero,
        private _formatFecha: FormatObjetoAFecha
    ){}

    ngOnInit(){
    }

    formatFechaNacimiento(obj:any){
        this.datosPersona.controls.fecha_nacimiento.setValue(this._formatFecha.onChange(obj));
    }

    esNumero(obj:any) {
        if (!this._validarNumero.onKey(obj.value)) {
            obj.value = obj.value.substring(0,obj.value.length - 1);
        } 
    }

    validarCuil(nroDocumento){
        /* if (nroDocumento.length == 7) {
            this.cuil_medio = '0' + nroDocumento;
        }else{ */
            this.cuil_medio = nroDocumento;
        //}
        return this.cuil_medio;
    }

    armarCuil(){
        let cuil_primero = this.datosPersona.value.cuil_prin;
        let cuil_ult = this.datosPersona.value.cuil_ult;
        let cuil = '';

        if (cuil_primero != '' && cuil_ult != '') {
            cuil = cuil_primero + this.cuil_medio + cuil_ult;
            return this.datosPersona.controls.cuil.setValue(cuil);
        }else{
            return this.datosPersona.controls.cuil.setValue('');
        }
    }
}
