import { Component, Injectable, Input } from "@angular/core";

@Component({
  selector: 'tag-component',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
@Injectable()
export class TagComponent {
  @Input("setTagid") public setTagid:number;
  @Input("listaTags") public listaTags: any;
  @Input("tituloComponente") public titulo: string;
  @Input("placeHolderComponente") public placeHolder: string;
  public tagsSeleccionados: any = [];

  constructor(){}
  /**
   * Obtiene el tag seleccionado por el auto completar
   * @param tag [any] contiene el los valores del tag
   */
  getTags(tag:any){
    if (tag !== undefined || tag.id != ''){
      this.tagsSeleccionados.push(tag);
    }
  }

  removerTag(index:number) {
    this.tagsSeleccionados.splice(index, 1);
  }
}
