import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-vista-plan',
    templateUrl: './vista-plan.component.html'
})
export class VistaPlanComponent implements OnInit {
  public titulos: string[] = [];
  public listado: any = [];

  constructor(
      private _router: Router, private _route: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.renderTabla(this._route.snapshot.data['planes']);
  }

  renderTabla(listaOficio: any) {
    this.titulos = Object.keys(listaOficio[0]);
    this.listado = listaOficio;
  }
}
