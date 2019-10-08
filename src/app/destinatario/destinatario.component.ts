import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-destinatario',
    templateUrl: './destinatario.html',
})
export class DestinatarioComponent implements OnInit {
    page = 1;
    destinatarios: any;
    totalFiltrado: number = 0;

    constructor(
      private _route: ActivatedRoute,
      ) {
    }

    ngOnInit(){
      //obtengo lista de destinatarios
      console.log(this._route.snapshot);
      this.destinatarios = this._route.snapshot.data['destinatarios'];
    }


}
