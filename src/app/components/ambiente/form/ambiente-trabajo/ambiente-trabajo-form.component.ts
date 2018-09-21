import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { ValidarNumero } from "../../../../shareds/validar-numero";
import { FormatObjetoAFecha } from "../../../../shareds/fechas";
// services
import { TipoAmbienteTrabajoService } from "../../../../services/tipo-ambiente-trabajo.service";
import { MensajesService } from "../../../../services/mensajes.service";

@Component({
    selector: 'datos-ambiente-trabajo-form',
    templateUrl: './ambiente-trabajo-form.html',
    styleUrls: ['./ambiente-trabajo-form.css'],
    providers: [ValidarNumero, FormatObjetoAFecha]
})
export class AmbienteTrabajoFormComponent implements OnInit {
    @Input("group") public datosAmbienteTrabajo: FormGroup;
    
    public tipoAt = '';
    public tipoAmbienteTrabajoListado:any = [];

    constructor(
        private _validarNumero: ValidarNumero,
        private _formatFecha: FormatObjetoAFecha,
        private _mensajeService: MensajesService,
        private _tipoAmbienteTrabajoService: TipoAmbienteTrabajoService
    ) { }

    ngOnInit() {
        this.listarTipoAmbienteTrabajo();
    }

    selTipo(event){
        if (event.target.selectedOptions[0].value != ''){
            this.tipoAt = 'de ' + event.target.selectedOptions[0].text
        }else{
            this.tipoAt = '';
        }
            return this.tipoAt;
    }

    /**
     * @function esCuit funcion que sirve para escribir solo números
     * @param event evento que toma el objeto de el input
     */
    esCuit(event: any) {
        let nro_docuemnto = this.datosAmbienteTrabajo.controls.cuit.value;
        if (!this._validarNumero.onKey(event)) {
            this.datosAmbienteTrabajo.controls.cuit.setValue(nro_docuemnto.substring(0, nro_docuemnto.length - 1));
        }
    }

    private listarTipoAmbienteTrabajo() {
        this._tipoAmbienteTrabajoService.listado().subscribe(
            datos => {
                this.tipoAmbienteTrabajoListado = datos;
        }, error => {
            this._mensajeService.cancelado(error,'');
        });
    }
}
