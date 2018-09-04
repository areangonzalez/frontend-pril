import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
// services
import { LocalidadService } from "../../../../services/localidad.service";

@Component({
    selector: 'hogar-form',
    templateUrl: './hogar.html',
    styleUrls: ['./hogar.css']
})
export class HogarComponent implements OnInit {
    /**
     * @param datosHogar objeto del formulario que viene del componente padre
     * @param submitted booleano que verifica el estado del fornulario
     * @var localidadLista object que obtiene el listado de localidades
     */
    @Input("group") public datosHogar: FormGroup;
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
     * @function hogar maneja el objeto del formulario de hogar
     */
    get hogar() { return this.datosHogar.controls; }

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
