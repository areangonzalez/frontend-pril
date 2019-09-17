import { Component, Injectable, OnInit } from "@angular/core";
import { OficioService, MensajesService } from "../../../core/services";

@Component({
  selector: 'tag-oficio-component',
  templateUrl: './tag-oficio.component.html',
  styleUrls: ['./tag-oficio.component.css']
})
@Injectable()
export class TagOficioComponent implements OnInit {
  //@Input("setOficio") public setOficioid;
  public setOficioid:number;
  public listaOficios: object;
  public oficiosSeleccionados: any = [];

  constructor(
    private _oficioService: OficioService,
    private _mensajesService: MensajesService
  ){}

  ngOnInit(){
    this.getListaOficios();
  }

  getListaOficios(){

    this._oficioService.listarOficios().subscribe(
      resultado => {
        this.listaOficios = resultado;
      }, error => {
        this._mensajesService.cancelado(error, [{name:''}]);
      });
  }

  getOficio(oficio){

    this.crearListaOficio(oficio);
    //this.destinatario.controls.oficioid.setValue(oficio.id);
  }

  getNombreListadoPorId(id, listado){
    let seleccion = "";
    for (var key in listado) {
        if(listado[key].id == id ){
            seleccion = listado[key];
        }
    }
    return seleccion;
  }

  crearListaOficio(oficio:any){
    if (oficio !== undefined || oficio.id != ''){
      console.log(oficio);
      this.oficiosSeleccionados.push(oficio);
    }
  }

}
