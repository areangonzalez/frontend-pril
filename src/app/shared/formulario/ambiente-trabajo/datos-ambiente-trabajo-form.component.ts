import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { UtilService } from "../../../core/utils";
// services
import { TipoAmbienteTrabajoService } from "../../../core/services/tipo-ambiente-trabajo.service";
import { MensajesService } from "../../../core/services/mensajes.service";

@Component({
    selector: 'datos-ambiente-trabajo-form',
    templateUrl: './datos-ambiente-trabajo-form.html',
    styleUrls: ['./datos-ambiente-trabajo-form.css'],
    providers: [UtilService]
})
export class DatosAmbienteTrabajoFormComponent implements OnInit {
    @Input("group") public datosAmbienteTrabajo: FormGroup;
    @Input("submitted") public submitted: boolean;

    public tipoAt = '';
    public tipoAmbienteTrabajoListado:any = [];

    constructor(
        private _utilService: UtilService,
        private _mensajeService: MensajesService,
        private _tipoAmbienteTrabajoService: TipoAmbienteTrabajoService
    ) { }

    ngOnInit() {
        this.listarTipoAmbienteTrabajo();
    }

    get ambiente(){ return this.datosAmbienteTrabajo.controls; }

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
        if (!this._utilService.validarNumero(event)) {
            this.datosAmbienteTrabajo.controls.cuit.setValue(nro_docuemnto.substring(0, nro_docuemnto.length - 1));
        }
    }

    private listarTipoAmbienteTrabajo() {
        this._tipoAmbienteTrabajoService.listado().subscribe(
            datos => {
                this.tipoAmbienteTrabajoListado = datos;
        }, error => {
            this._mensajeService.cancelado(error, [{ name: '' }]);
        });
    }
}
