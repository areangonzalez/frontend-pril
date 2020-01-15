import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'abm-form',
    templateUrl: './abm-form.component.html'
})
export class AbmFormComponent implements OnInit {
  @Input("armarForm") public armarForm:any;
  @Input("datos") public datos:any;

  public formulario: FormGroup;
  public crearInputs: any[] = [];
    constructor( private _fb: FormBuilder ) {}

    ngOnInit() {
      this.formulario = this.armadoFormulario(this.armarForm);
    }


    armadoFormulario(objetoForm: any){
      let controls = {};

      for (let i = 0; i < objetoForm.length; i++) {
        if (objetoForm[i] !== 'id' ){
          controls["" + objetoForm[i]] = ['', Validators.required];
          this.crearInputs.push(objetoForm[i]);
        }
      }

      let formArray = this._fb.group(controls);

      return formArray;
    }

}
