import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'gu-form-agente',
    templateUrl: './gu-form-agente.component.html',
})
export class GuFormAgenteComponent implements OnInit {
  @Input("agenteForm") agente: FormGroup;
  @Input("submitted") submitted: boolean;

  constructor(private _router: Router) {}

  ngOnInit() {
  }

}
