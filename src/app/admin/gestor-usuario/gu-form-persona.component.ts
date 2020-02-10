import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'gu-form-persona',
    templateUrl: './gu-form-persona.component.html',
})
export class GuFormPersonaComponent implements OnInit {

  public persona: FormGroup;
  public comf_password: string = '';
  public submitted = false;

  constructor(private _router: Router, private _fb: FormBuilder) {
    this.persona = _fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

}
