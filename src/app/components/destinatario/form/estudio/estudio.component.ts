import { Component, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
// services
import { NivelEducativoService } from "../../../../services/nivel-educativo.service";

@Component({
    selector: 'estudio-form',
    templateUrl: './estudio.html',
    styleUrls: ['./estudio.css'],
})
@Injectable()
export class EstudioComponent implements OnInit {
    @Input("group") public estudios: FormGroup;
    @Input("submitted") public submitted;
    @Input("errorNivelEducativo") public errorNivelEducativo;
    @Input("datosEstudio") public datosEstudio;

    listaNivelEducativo: Object = [];

    /**
     * @param _router Servicio para la navegacion dentro del sistema
     */
    constructor(
        private _router: Router,
        private _nivelEducativoService: NivelEducativoService
    ) { 
        
    }
    /**
     * @function estudiosForm función que controla el objeto del formulario de estudios
     */
    get estudiosForm() { return this.estudios.controls; }

    ngOnInit() {
        this.getNivelEducativo();
        if (this.datosEstudio) {
            this.estudios.setValue(this.datosEstudio);
        }
    }
    /**
     * @function estaCheckeado función que administra los checkbox del formulario 
     * @param e objeto que trae los valores del checkbox
     */
    estaCheckeado(e){
        if(e.target.id == 'estudio_completo') {
            this.estudiosForm.completo.setValue(e.target.checked);
            this.estudiosForm.en_curso.setValue(!e.target.checked);
        }else{
            this.estudiosForm.completo.setValue(!e.target.checked);
            this.estudiosForm.en_curso.setValue(e.target.checked);
        }
    } 
    /**
     * @function geNivelEsducativo función que obtiene el listado de nivel educativo
     */
    getNivelEducativo(){
        this._nivelEducativoService.listado().subscribe(
            datos => {
                console.log(datos);
                this.listaNivelEducativo = datos;
            }, error => { console.log(Error); }
        );
    }
    /**
     * @function seleccionarNombre valida que el nombre seleccionado de la lista de opciones no sea uno existente en el listado de estudios del destinatario
     * @param e objeto que obtiene los valores del select
     */
    seleccionarNombre(e){
        let opcionesCombo = e.target['options'];
        this.estudiosForm.nivel_educativo_nombre.setValue(opcionesCombo[opcionesCombo.selectedIndex].text);
    }
}