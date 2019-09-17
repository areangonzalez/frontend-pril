import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from "../../../core/utils";
// services
import { SexoService, GeneroService, EstadoCivilService, PersonaService, MensajesService } from "../../../core/services";

@Component({
    selector: 'datos-persona-form',
    templateUrl: './datos-persona.html',
    styleUrls: ['./datos-persona.css'],
    providers: [PersonaService, UtilService]
})
export class DatosPersonaComponent implements OnInit {
    /**
     * @var datosPersoa Variable que contiene el formulario de persona
     * @var submitted indica el estado del envio del formulario
     * @var documento setea el documento cuando el formulario esta en modo edición
     */
    @Input("group") public datosPersona: FormGroup;
    @Input("submitted") public submitted: boolean;
    @Input("documento") public setDocumento: string;
    @Input("sexoLista") public sexoLista: any;
    @Input("generoLista") public generoLista: any;
    @Input("estadoCivilLista") public estadoCivilLista: any;
    @Input("mostrarBtnBusqueda") public mostrarBtnBusqueda: boolean;
    @Output("setListaEstudios") public setListaEstudios = new EventEmitter();

    /**
     * @var cuil_medio String que guarda el documento para el numero de cuil
     * @var sexoLista Object listado de sexo
     * @var generoLista Object listado de genero
     * @var estadoCivilLista Object listado de estado civil
     */
    public cuil_medio = '';
    nroDocumentoBusqueda:string = '';

    /**
     *
     * @param _sexoService servicio para obtener las funciones de sexo
     * @param _generoService servicio para obtener las funciones par del genero
     * @param _estadoCivilService servicio para obtener las funciones de estado civil
     */
    constructor(
      private _route: ActivatedRoute,
      private _personaService: PersonaService,
      private _mensajeService: MensajesService,
      private _utilService: UtilService
    ){}

    ngOnInit(){}

    /*** Funciones para el compoente  ***/

    /**
     * @function formatFechaNaciento convierte la fecha en un string
     * @param obj la fecha viene en formato objeto
     */
    formatFechaNacimiento(obj:any){
        this.datosPersona.controls.fecha_nacimiento.setValue(this._utilService.formatObjetoAFecha(obj));
    }
    /**
     * @function esNumero valida si el valor del objeto es de tipo numero
     * @param obj objeto que contiene los valores del input.
     */
    esNumero(obj:any) {
        if (!this._utilService.validarNumero(obj.value)) {
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
        if (nro_documento != '') {
            this.nroDocumentoBusqueda = nro_documento;
            this._personaService.personaPorNroDocumento(nro_documento)
            .map(vDatos => {
              let vPersona = {};
              if (vDatos.estado) {
                // seteo listado de estudio
                this.setListaEstudios.emit(vDatos.resultado[0]['estudios']);
                // borro datos que no sirven
                delete vDatos.resultado[0]['estudios'];
                delete vDatos.resultado[0]['fax'];

                // agrego los datos de persona
                vPersona = vDatos.resultado[0];
                // ingreso el estado
                vPersona['estado'] = vDatos.estado;
                // configuro las variables del formulario
                vPersona['cuil_prin'] = this.primerosDigitosCuil(vDatos.resultado[0]['cuil']);
                vPersona['cuil_ult'] = this.ultimoDigitoCuil(vDatos.resultado[0]['cuil']);
                vPersona['fechaNacimiento'] = this.fechaAObjeto(vDatos.resultado[0]['fecha_nacimiento']);
              }else{
                vPersona['estado'] = vDatos.estado;
                vPersona['message'] = vDatos.message;
              }
              // returno el array pre-armado
              return vPersona;
            })
            .subscribe(
                respuesta => {
                  if (respuesta['estado']){
                    this.datosPersona.patchValue(respuesta);
                  }else{
                        this.resetForm(this.datosPersona);
                        this._mensajeService.cancelado(respuesta['message'], [{ name: '' }]);
                        this.datosPersona.controls.nro_documento.setValue(nro_documento);
                        this.cuil_medio = nro_documento;
                    }
                }, error => {
                    this._mensajeService.cancelado(error, [{ name: '' }]);
                });
        }
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

    // reseteo el formulario y pongo las variables en vacio
    public resetForm(formGroup: FormGroup) {
        let control: AbstractControl = null;
        // variables generales en el formulario
        this.cuil_medio = '';
        this.nroDocumentoBusqueda = '';
        this.setListaEstudios.emit([]);

        // formulario reset
        formGroup.reset();
        formGroup.markAsUntouched();
        Object.keys(formGroup.controls).forEach((name) => {
            control = formGroup.controls[name];
            if(control instanceof FormGroup){
                this.resetForm(control)
            }else{
                control.setValue('');
                control.setErrors(null);
            }

        });
    }

}
