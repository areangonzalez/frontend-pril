import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { ValidarNumero } from "../../../../shareds/validar-numero";
import { FormatObjetoAFecha } from "../../../../shareds/fechas";
// services
import { SexoService } from "../../../../services/sexo.service";
import { GeneroService } from "../../../../services/genero.service";
import { EstadoCivilService } from "../../../../services/estado-civil.service";
import { PersonaService } from "../../../../services/persona.service";

@Component({
    selector: 'datos-persona-form',
    templateUrl: './datos-persona.html',
    styleUrls: ['./datos-persona.css'],
    providers: [ValidarNumero, FormatObjetoAFecha]
})
export class DatosPersonaComponent implements OnInit {
    /**
     * @var datosPersoa Variable que contiene el formulario de persona
     * @var submitted indica el estado del envio del formulario
     */
    @Input("group") public datosPersona: FormGroup;
    @Input("submitted") public submitted;
    @Input("documento") public setDocumento: string;
    @Output("setListaEstudios") public setListaEstudios = new EventEmitter();
    
    /**
     * @var cuil_medio String que guarda el documento para el numero de cuil
     * @var sexoLista Object listado de sexo
     * @var generoLista Object listado de genero
     * @var estadoCivilLista Object listado de estado civil
     */
    public cuil_medio = '';
    public sexoLista:Object = [];
    public generoLista:Object = [];
    public estadoCivilLista:Object = [];

    toStr = JSON.stringify;

    /**
     * 
     * @param _validarNumero funcion que verifica si los datos ingresado son números
     * @param _formatFecha funcion que formatea la fecha a un string
     * @param _sexoService servicio para obtener las funciones de sexo
     * @param _generoService servicio para obtener las funciones par del genero
     * @param _estadoCivilService servicio para obtener las funciones de estado civil
     */
    constructor(
        private _validarNumero: ValidarNumero,
        private _formatFecha: FormatObjetoAFecha,
        private _sexoService: SexoService,
        private _generoService: GeneroService,
        private _estadoCivilService: EstadoCivilService,
        private _personaService: PersonaService
    ){}

    ngOnInit(){
        this.listarSexo();
        this.listarGenero();
        this.listarEstadoCivil();
    }
    /**
     * @function persona se utiliza para controlar el objeto del formulario de persona
     */
    get persona() { return this.datosPersona.controls; }

    /*** Listas para el compoente  ***/

    /**
     * @function listarSexo obtiene el listado de sexo
     */
    listarSexo(){
        this._sexoService.listado().subscribe(
            datos => {
                this.sexoLista = datos;
        }, error => {
            console.log("error del sistema");
        });
    }
    /**
     * @function listarGenero obtiene el listado de genero
     */
    listarGenero() {
        this._generoService.listado().subscribe(
            datos => {
                this.generoLista = datos;
            }, error => {
                console.log("error del sistema");
            });
    }
    /**
     * @function listarGenero obtiene el listado de genero
     */
    listarEstadoCivil() {
        this._estadoCivilService.listado().subscribe(
            datos => {
                this.estadoCivilLista = datos;
            }, error => {
                console.log("error del sistema");
            });
    }

    /*** Funciones para el compoente  ***/

    /**
     * @function formatFechaNaciento convierte la fecha en un string
     * @param obj la fecha viene en formato objeto
     */
    formatFechaNacimiento(obj:any){
        this.datosPersona.controls.fecha_nacimiento.setValue(this._formatFecha.onChange(obj));
    }
    /**
     * @function esNumero valida si el valor del objeto es de tipo numero
     * @param obj objeto que contiene los valores del input.
     */
    esNumero(obj:any) {
        if (!this._validarNumero.onKey(obj.value)) {
            obj.value = obj.value.substring(0,obj.value.length - 1);
        } 
    }
    /**
     * @function validarCuil verifica la validación de cuil, si el cuil tiene 7 digitos los rellena con ceros
     * @param nroDocumento string utilizado para la validacion del número de documento
     */
    validarCuil(nroDocumento){
        if (nroDocumento.length == 7) {
            this.cuil_medio = '0' + nroDocumento;
        }else{
            this.cuil_medio = nroDocumento;
        }
        return this.cuil_medio;
    }
    /**
     * @function armarCuil funcion que arma el cuil uniendo las variables de los formularios
     */
    armarCuil(){
        let cuil_primero = this.datosPersona.value.cuil_prin;
        let cuil_ult = this.datosPersona.value.cuil_ult;
        let cuil = '';
        // verifico si las variables son distintas a vacio
        // si la validacion es correcta seteo el valor del formulario con el cuil armado
        if (cuil_primero != '' && cuil_ult != '') {
            cuil = cuil_primero + this.cuil_medio + cuil_ult;
            return this.datosPersona.controls.cuil.setValue(cuil);
        }else{ // si esta vacio seteo el valor del formulario en vacion
            return this.datosPersona.controls.cuil.setValue('');
        }
    }
    /**
     * @function generarCuilEditado genera el cuil para el formulario en estado de edición
     * @param cuil numero de cuil que viene por la edicion de una persona
     */
    generarCuilEditado(cuil){
        let cuil_primero = '';
        let cuil_ult = '';
        if (cuil != '') {
            cuil_primero = cuil.substring(0,2);
            this.cuil_medio = cuil.substring(2,10)
            cuil_ult = cuil.substring(10);

            this.datosPersona.controls.cuil_prin.setValue(31);
            this.datosPersona.controls.cuil_ult.setValue(cuil_ult);

            return this.cuil_medio;
        }
    }
    /**
     * @function validarPersonaPorNroDocumento validación para la existencia de una persona dentro de la base de datos
     */
    validarPersonaPorNroDocumento(nro_documento){
        this._personaService.personaPorNroDocumento(nro_documento).subscribe(
            respuesta => {
                console.log(respuesta);
                if (respuesta['estado']){
                    console.log('array: ', respuesta['resultado']);
                    let persona = respuesta['resultado'][0];
                    // actualizo la lista de estudio enviandolo al componente padre.
                    this.setListaEstudios.emit(persona.estudios);
                    // borro los estudios del objeto
                    delete persona.estudios;
                    // Agrego parametros que son representativos en el formulario.
                    persona['cuil_prin'] = this.primerosDigitosCuil(persona.cuil);
                    persona['cuil_ult'] = this.ultimoDigitoCuil(persona.cuil);
                    persona['fechaNacimiento'] = this.fechaAObjeto(persona.fecha_nacimiento);
                    // seteo los valores al formularios con los datos de persona
                    this.datosPersona.setValue(persona);
                }else{
                    console.log('message: ', respuesta['message']);
                }
            }, error => {
                console.log('Error: ', error);
            })
    }

    /**
     * @function primerosDigitosCuil corta la cadena de cuil para obtener los dos primeros digitos
     * @param cuil cadena del numero de cuil
     * @return devuelve un string 
     */
    private primerosDigitosCuil(cuil: string) {
        let cuil_primero = cuil.substring(0, 2);
        return cuil_primero;
    }
    /**
     * @function ultimoDigitoCuil corta la cadena de cuil para obtener el ultimo digito
     * @param cuil cadena de numero cuil
     * @return devuelve un string
     */
    private ultimoDigitoCuil(cuil: string) {
        let cuil_ult = cuil.substring(10);
        return cuil_ult;
    }

    /**
     * @function fechaAObjeto formatea la fecha de string a un objeto para los input de fecha
     * @param fecha string de fecha
     * @return devuelve un objeto
     */
    private fechaAObjeto(fecha: string) {
        let objFecha = fecha.split('-');

        return { year: parseInt(objFecha[0]), month: parseInt(objFecha[1]), day: parseInt(objFecha[2]) };
    }

}
