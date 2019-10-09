import { Component, Injectable, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'vista-tag-component',
  templateUrl: './vista-tag.component.html',
  styleUrls: ['./tag.component.css']
})
@Injectable()
export class VistaTagComponent {
  @Input("listaTags") public listaTags: any; // listado de tags a seleccionar

  constructor(){}
}
