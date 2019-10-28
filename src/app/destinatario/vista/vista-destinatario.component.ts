import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'vista-destinatario',
    templateUrl: './vista-destinatario.component.html',
})
export class VistaDestinatarioComponent implements OnInit {
    public destinatario: any;

    constructor( private _route: ActivatedRoute) {}

    ngOnInit(){
      // datos destinatario
      this.destinatario = this._route.snapshot.data['destinatario'];
    }

}
