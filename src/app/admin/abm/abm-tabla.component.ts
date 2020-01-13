import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'abm-tabla',
    templateUrl: './abm-tabla.component.html',
    styleUrls: ['./abm-tabla.css']
})
export class AbmTablaComponent implements OnInit {
  @Input("titulosArray") public titulosArray:any;
  @Input("listado") public listado:any;

    constructor(
        private _router: Router,
      ) {
    }

    ngOnInit() {
    }

    editar(id:number){
      console.log(id);
    }

    borrar(id:number){
      console.log(id);

    }
}
