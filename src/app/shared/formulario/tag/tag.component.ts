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
  @Input("textMsjError") public textMsjError: string;
  public mostrarError: boolean = false;
  public tagsSeleccionados: any = [];

  constructor(){}
  /**
   * Obtiene el tag seleccionado por el auto completar
   * @param tag [any] contiene el los valores del tag
   */
  getTags(tag:any){
    if (tag !== undefined || tag.id != ''){
      if (!this.tagDuplicado(tag.id, this.tagsSeleccionados)){
        this.tagsSeleccionados.push(tag);
        this.mostrarError = false;
      }else{
        this.mostrarError = true;
      }
    }
  }
  /**
   * Se remueve un tag del listado
   * @param index [number] indice del elemento
   */
  removerTag(index:number) {
    this.tagsSeleccionados.splice(index, 1);
  }
  /**
   * Se valida a traves del listado de seleccion el id del tag seleccionado.
   * @param idTag [number] id a validar
   * @param listado [any] listado donde se verificara si el idTag existe
   */
  tagDuplicado(idTag:number, listado: any) {
    let existe: boolean = false;
    for (let i = 0; i < listado.length; i++) {
      if (listado[i].id == idTag) {
        existe = true;
      }
    }
    return existe;
  }
}
