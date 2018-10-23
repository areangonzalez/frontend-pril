import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
// services
import { LocalidadService } from "../../../../services/localidad.service";

@Component({
    selector: 'lugar-form',
    templateUrl: './lugar.html',
    styleUrls: ['./lugar.css']
})
export class LugarComponent implements OnInit {
    /**
     * @param datosLugar objeto del formulario que viene del componente padre
     * @param submitted booleano que verifica el estado del fornulario
     * @var localidadLista object que obtiene el listado de localidades
     */
    @Input("group") public datosLugar: FormGroup;
    @Input("submitted") public submitted;

    public localidadLista:Object = [];

    /**
     * @param _localidadService: servicio que sirve para obtener las funciones de localidad
     */
    constructor(
        private _localidadService: LocalidadService
    ) { }

    ngOnInit() {
        this.listarLocalidades();
    }
    /**
     * @function lugar maneja el objeto del formulario de hogar
     */
    get lugar() { return this.datosLugar.controls; }

    /**
     * @function listarLocalidades función que obtiene el listado de localidades
     */
    listarLocalidades(){
        this._localidadService.listado().subscribe(
            datos => {
                this.localidadLista = datos;
        }, error => { return console.log("Error del sistema"); });
    }

    
}
