import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
import { MensajesService } from '../../../core/services';
import { UtilService } from 'src/app/core/utils';

@Component({
    selector: 'datos-destinatario-form',
    templateUrl: './datos-destinatario.html',
    styleUrls: ['./datos-destinatario.css'],
    providers: [UtilService]
})
export class DatosDestinatarioComponent implements OnInit {
    @Input("group") public destinatario: FormGroup;
    @Input("submitted") public submitted;


    public listaOficios:object;

    constructor(
        private _mensajeService: MensajesService,
        private _utilService: UtilService
    ){}

    ngOnInit() {}

    formatFechapresentacion(obj: any) {
        this.destinatario.get('fecha_presentacion').setValue(this._utilService.formatObjetoAFecha(obj));
    }

    esNumero(obj: any) {
        if (!this._utilService.validarNumero(obj.value)) {
            obj.value = obj.value.substring(0, obj.value.length - 1);
        }
    }
}
