import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
import { ValidarNumero } from "../../../../shareds/validar-numero";
import { FormatObjetoAFecha } from "../../../../shareds/fechas";

@Component({
    selector: 'datos-destinatario-form',
    templateUrl: './datos-destinatario.html',
    styleUrls: ['./datos-destinatario.css'],
    providers: [FormatObjetoAFecha, ValidarNumero]
})
export class DatosDestinatarioComponent implements OnInit {
    @Input("group") public destinatario: FormGroup;
    @Input("submitted") public submitted;

    constructor(
        private _validarNumero: ValidarNumero,
        private _formatFecha: FormatObjetoAFecha
    ){}

    ngOnInit() { }
    
    get destinatarioForm() { return this.destinatario.controls; }

    formatFechapresentacion(obj: any) {
        this.destinatario.controls.fecha_presentacion.setValue(this._formatFecha.onChange(obj));
    }

    esNumero(obj: any) {
        if (!this._validarNumero.onKey(obj.value)) {
            obj.value = obj.value.substring(0, obj.value.length - 1);
        }
    }

}
