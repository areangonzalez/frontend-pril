import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'gu-form-usuario',
    templateUrl: './gu-form-usuario.component.html',
})
export class GuFormUsuarioComponent implements OnInit {
  @Input("usuarioForm") usuario: FormGroup;
  @Input("submitted") submitted: boolean;

  constructor(private _router: Router) {}

  ngOnInit() {
  }

}
