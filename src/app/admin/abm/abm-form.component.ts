import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'abm-form',
    templateUrl: './abm-form.component.html'
})
export class AbmFormComponent implements OnInit {
  @Input("armarForm") public armarForm:any;
  @Input("datos") public datos:any;
  @Output("obtenerDatos") public obtenerDatos = new EventEmitter();
  @Output("cancelarForm") public cancelarForm = new EventEmitter();

  public submitted: boolean = false;
  public formulario: FormGroup;
  public crearInputs: any[] = [];
    constructor( private _fb: FormBuilder ) {}

    ngOnInit() {
      this.formulario = this.armadoFormulario(this.armarForm);
    }

    /**
     * Armo el objeto desde un array para agregarlo en un Group de FormBuilder
     * @param arrayKeysForm [Array] array que contiene los nombres de la tabla a armar.
     */
    armadoFormulario(arrayKeysForm: any){
      let controls = {};

      for (let i = 0; i < arrayKeysForm.length; i++) {
        if (arrayKeysForm[i] !== 'id' ){
          controls["" + arrayKeysForm[i]] = ['', Validators.required];
          this.crearInputs.push(arrayKeysForm[i]);
        }
      }

      let formArray = this._fb.group(controls);

      return formArray;
    }

    cancelar() {
      this.cancelarForm.emit(true);
    }
    /**
     * Valido el formulario
     */
    validarForm() {
      this.submitted = true;
      // invalido
      if (this.formulario.invalid) {
        return;
      }else{ // valido
        let datos = this.formulario.value;
        datos["id"] = 0;
        this.obtenerDatos.emit(datos);
      }
    }

}
