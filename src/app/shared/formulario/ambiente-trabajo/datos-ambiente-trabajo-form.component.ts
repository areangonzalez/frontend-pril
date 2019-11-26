import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { UtilService } from "../../../core/utils";

@Component({
    selector: 'datos-ambiente-trabajo-form',
    templateUrl: './datos-ambiente-trabajo-form.html',
    styleUrls: ['./datos-ambiente-trabajo-form.css'],
    providers: [UtilService]
})
export class DatosAmbienteTrabajoFormComponent implements OnInit {
    @Input("group") public ambiente: FormGroup;
    @Input("submitted") public submitted: boolean;
    @Input("tipoAmbienteTrabajoLista") public tipo_ambiente_trabajo_lista: any; // lista de tipos de ambientes de trabajo

    public tipoAt = '';
    public tipoAmbienteTrabajoListado:any = [];

    constructor(
        private _utilService: UtilService,
    ) { }

    ngOnInit() {
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
     * @param obj evento que toma el objeto de el input
     */
    esCuit(obj: any) {
        if (!this._utilService.validarNumero(obj.value)) {
            obj.value = obj.value.substring(0,obj.value.length - 1);
        }
    }
}
