import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-destinatario',
    templateUrl: './destinatario.html',
})
export class DestinatarioComponent implements OnInit {
    public page = 1;
    public destinatarios: any;
    public totalFiltrado: number = 0;

    constructor(
      private _route: ActivatedRoute,
      ) {
    }

    ngOnInit(){
      //obtengo lista de destinatarios
      this.destinatarios = this._route.snapshot.data['destinatarios'];
    }


}
