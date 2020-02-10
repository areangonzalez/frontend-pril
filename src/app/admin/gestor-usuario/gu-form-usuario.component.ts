import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { compareValidator } from 'src/app/shared/helpers/compare-validator';

@Component({
    selector: 'gu-form-usuario',
    templateUrl: './gu-form-usuario.component.html',
})
export class GuFormUsuarioComponent implements OnInit {

  public usuario: FormGroup;
  public submitted = false;

  constructor(private _router: Router, private _fb: FormBuilder) {
    this.usuario = _fb.group({
      user_name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      comf_password: ['', [Validators.required, compareValidator('password')]]
    })
  }

  ngOnInit() {
  }

  validarPassword(valor: string){
    return (valor === this.usuario.get('password').value) ? true : false;
  }

}
