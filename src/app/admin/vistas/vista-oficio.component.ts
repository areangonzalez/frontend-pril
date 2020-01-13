import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-vista-oficio',
    templateUrl: './vista-oficio.component.html'
})
export class VistaOficioComponent implements OnInit {
  public titulos: string[] = [];
  public listado: any = [];

    constructor(
        private _router: Router, private _route: ActivatedRoute
      ) {
    }

    ngOnInit() {
      this.renderTabla(this._route.snapshot.data['oficios']);
    }

    renderTabla(listaOficio: any) {
      this.titulos = Object.keys(listaOficio[0]);
      this.listado = listaOficio;
    }

}
