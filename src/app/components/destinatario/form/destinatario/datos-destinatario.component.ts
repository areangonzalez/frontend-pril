import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
import { ValidarNumero } from "../../../../shareds/validar-numero";
import { FormatObjetoAFecha } from "../../../../shareds/fechas";

import { ProfesionService } from '../../../../services/profesion.service';
import { OficioService } from "../../../../services/oficio.service";

@Component({
    selector: 'datos-destinatario-form',
    templateUrl: './datos-destinatario.html',
    styleUrls: ['./datos-destinatario.css'],
    providers: [FormatObjetoAFecha, ValidarNumero]
})
export class DatosDestinatarioComponent implements OnInit {
    @Input("group") public destinatario: FormGroup;
    @Input("submitted") public submitted;

    public listaProfesiones:object;
    public listaOficios:object;

    constructor(
        private _validarNumero: ValidarNumero,
        private _formatFecha: FormatObjetoAFecha,
        private _profesionService: ProfesionService,
        private _oficioService: OficioService
    ){
    }

    ngOnInit() {
         this.profesiones();
         this.oficios();
    }
    
    get destinatarioForm() { return this.destinatario.controls; }

    formatFechapresentacion(obj: any) {
        this.destinatario.controls.fecha_presentacion.setValue(this._formatFecha.onChange(obj));
    }

    esNumero(obj: any) {
        if (!this._validarNumero.onKey(obj.value)) {
            obj.value = obj.value.substring(0, obj.value.length - 1);
        }
    }

    profesiones() {
        this._profesionService.listarProfesiones().subscribe(
            data =>{
               return this.listaProfesiones = data;
            },
            error => {
                console.log(<any>error);
            }
        );
    } 

    oficios() {
        this._oficioService.listarOficios().subscribe(
            data => {
                return this.listaOficios = data;
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    getProfesion(profesion){
        this.destinatario.controls.profesionid.setValue(profesion.id);
    }

    getOficio(oficio){
        this.destinatario.controls.oficioid.setValue(oficio.id);
    }

}
