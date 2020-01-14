import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-vista-profesion',
    templateUrl: './vista-profesion.component.html'
})
export class VistaProfesionComponent implements OnInit {
  public titulos: string[] = [];
  public listado: any = [];

  constructor(
      private _router: Router, private _route: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.renderTabla(this._route.snapshot.data['profesiones']);
  }

  renderTabla(listaOficio: any) {
    this.titulos = Object.keys(listaOficio[0]);
    this.listado = listaOficio;
  }
}
