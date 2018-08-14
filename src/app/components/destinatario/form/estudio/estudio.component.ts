import { Component, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";

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
    //@Output() datosEstudios = new EventEmitter();

    listaNivelEducativo = [];

    /**
     * @param _router Servicio para la navegacion dentro del sistema
     */
    constructor(
        private _router: Router,
    ) { 
        
    }

    get estudiosForm() { return this.estudios.controls; }

    ngOnInit() {
        this.getNivelEducativo();
        if (this.datosEstudio) {
            this.estudios.setValue(this.datosEstudio);
        }
    }

    estaCheckeado(e){
        if(e.target.id == 'estudio_completo') {
            this.estudiosForm.completo.setValue(e.target.checked);
            this.estudiosForm.en_curso.setValue(!e.target.checked);
        }else{
            this.estudiosForm.completo.setValue(!e.target.checked);
            this.estudiosForm.en_curso.setValue(e.target.checked);
        }
    } 

    getNivelEducativo(){
        return this.listaNivelEducativo = [
            { id: 1, nombre: 'Primaria' },
            { id: 2, nombre: 'Secundaria' },
            { id: 3, nombre: 'Terciaria' },
            { id: 4, nombre: 'Universitaria' }
        ];
    }

    seleccionarNombre(e){
        let opcionesCombo = e.target['options'];
        this.estudiosForm.nivel_educativo_nombre.setValue(opcionesCombo[opcionesCombo.selectedIndex].text);
    }
}