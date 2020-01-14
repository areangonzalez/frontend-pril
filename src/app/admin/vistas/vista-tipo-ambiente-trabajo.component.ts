import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-vista-tipo-ambiente-trabajo',
    templateUrl: './vista-tipo-ambiente-trabajo.component.html'
})
export class VistaTipoAmbienteTrabajoComponent implements OnInit {
  public titulos: string[] = [];
  public listado: any = [];

  constructor(
      private _router: Router, private _route: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.renderTabla(this._route.snapshot.data['tipoAmbienteTrabajos']);
  }

  renderTabla(listaOficio: any) {
    this.titulos = Object.keys(listaOficio[0]);
    this.listado = listaOficio;
  }
}
