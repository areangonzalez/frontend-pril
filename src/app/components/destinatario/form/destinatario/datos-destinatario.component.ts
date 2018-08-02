import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
import { FormatObjetoAFecha } from "../../../../shareds/fechas";

@Component({
    selector: 'datos-destinatario-form',
    templateUrl: './datos-destinatario.html',
    styleUrls: ['./datos-destinatario.css'],
    providers: [FormatObjetoAFecha]
})
export class DatosDestinatarioComponent implements OnInit {
    @Input("group") public destinatario: FormGroup;
    @Input("submitted") public submitted;

    constructor(
        private _formatFecha: FormatObjetoAFecha
    ){}

    ngOnInit() { }
    
    get destinatarioForm() { return this.destinatario.controls; }

    formatFechapresentacion(obj: any) {
        this.destinatario.controls.fecha_presentacion.setValue(this._formatFecha.onChange(obj));
    }

}
