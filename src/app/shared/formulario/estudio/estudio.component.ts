import { Component, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
// services
import { NivelEducativoService, ProfesionService, MensajesService } from "../../../core/services";

@Component({
    selector: 'estudio-form',
    templateUrl: './estudio.html',
    styleUrls: ['./estudio.css'],
})
@Injectable()
export class EstudioComponent implements OnInit {
    @Input("group") public estudios: FormGroup;
    @Input("submitted") public submitted: boolean;
    @Input("errorNivelEducativo") public errorNivelEducativo;
    @Input("datosEstudio") public datosEstudio;
    @Input("setProfesionId") public setProfesionid:number;

    listaNivelEducativo: Object = [];
    listaAnios: any = [];
    estudioCompleto: boolean = true;
    public listaProfesiones:any;

    /**
     * @param _router Servicio para la navegacion dentro del sistema
     */
    constructor(
        private _router: Router,
        private _nivelEducativoService: NivelEducativoService,
        private _profesionService: ProfesionService,
        private _mensajesService: MensajesService
    ) {

    }

    ngOnInit() {
        this.getNivelEducativo();
        this.obtenerAnios();
        this.profesiones();
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
            this.estudios.get('completo').setValue(e.target.checked);
            this.estudios.get('en_curso').setValue(!e.target.checked);
            this.estudioCompleto = true;
        }else{
            this.estudios.get('completo').setValue(!e.target.checked);
            this.estudios.get('en_curso').setValue(e.target.checked);
            this.estudios.get('anio').setValue('');
            this.estudioCompleto = false;
        }
    }
    /**
     * @function geNivelEsducativo función que obtiene el listado de nivel educativo
     */
    getNivelEducativo(){
        this._nivelEducativoService.listado().subscribe(
            datos => {
                this.listaNivelEducativo = datos;
            }, error => { this._mensajesService.cancelado(error, [{name:''}]); }
        );
    }
    /**
     * @function seleccionarNombre valida que el nombre seleccionado de la lista de opciones no sea uno existente en el listado de estudios del destinatario
     * @param e objeto que obtiene los valores del select
     */
    seleccionarNombre(e){
        let opcionesCombo = e.target['options'];
        this.estudios.get('nivel_educativo').setValue(opcionesCombo[opcionesCombo.selectedIndex].text);
    }
    /**
     * Genero un listado de años
     */
    obtenerAnios(){
        let anioActual = (new Date()).getFullYear();
        for (var i = 1970; i <= anioActual; i++) {
            this.listaAnios.push(i);
        }

        return this.listaAnios;
    }
    /**
     * Obtengo el listado de profesiones
     */
    profesiones() {
      this._profesionService.listarProfesiones().subscribe(
          data =>{
             return this.listaProfesiones = data;
          },
          error => {
            this._mensajesService.cancelado(error, [{name:''}]);
          }
      );
  }
  /**
   * Seteo el id de profesion al formulario
   * @param profesion
   */
  getProfesion(profesion){
    this.estudios.controls.profesionid.setValue(profesion.id);
  }

  getNombreListadoPorId(id, listado){
      let seleccion = "";
      for (var key in listado) {
          if(listado[key].id == id ){
              seleccion = listado[key].nombre;
          }
      }
      return seleccion;
  }
}
