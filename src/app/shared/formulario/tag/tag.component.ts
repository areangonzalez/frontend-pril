import { Component, Injectable, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'tag-component',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
@Injectable()
export class TagComponent {
  @Input("setTagid") public setTagid:number; // seteo tag por id
  @Input("setListaTags") public setListaTags: any; // seteo listado de tags
  @Input("listaTags") public listaTags: any; // listado de tags a seleccionar
  @Input("tituloComponente") public titulo: string; // Titulo del input
  @Input("placeHolderComponente") public placeHolder: string; // leyenda del input
  @Input("textMsjError") public textMsjError: string; // mensaje de error a mostrar
  @Output("obtenerTags") public obtenerTags = new EventEmitter(); // funcion que obtiene los tags seleccionados
  public mostrarError: boolean = false; // Muestra error
  public tagsSeleccionados: any = []; // listado de los tags seleccionados

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
    this.obtenerTags.emit(this.tagsSeleccionados);
  }
  /**
   * Se remueve un tag del listado
   * @param index [number] indice del elemento
   */
  removerTag(index:number) {
    this.tagsSeleccionados.splice(index, 1);
    this.obtenerTags.emit(this.tagsSeleccionados);
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
