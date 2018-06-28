import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
import { FormatObjetoAFecha } from "../../../../shareds/fechas";

@Component({
    selector: 'datos-destinatario-form',
    templateUrl: './datos-destinatario.component.html',
    styleUrls: ['./datos-destinatario.component.css'],
    providers: [FormatObjetoAFecha]
})
export class DatosDestinatarioComponent implements OnInit {
    @Input("group") public destinatario: FormGroup;

    constructor(
        private _formatFecha: FormatObjetoAFecha
    ){}

    ngOnInit() { }

    formatFechapresentacion(obj: any) {
        this.destinatario.controls.fecha_presentacion.setValue(this._formatFecha.onChange(obj));
    }
}
