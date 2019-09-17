import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
import { OficioService, MensajesService } from '../../../core/services';
import { UtilService } from 'src/app/core/utils';

@Component({
    selector: 'datos-destinatario-form',
    templateUrl: './datos-destinatario.html',
    styleUrls: ['./datos-destinatario.css'],
    providers: [UtilService]
})
export class DatosDestinatarioComponent implements OnInit {
    @Input("group") public destinatario: FormGroup;
    @Input("submitted") public submitted;
    @Input("setOficio") public setOficioid;


    public listaOficios:object;

    constructor(
        private _oficioService: OficioService,
        private _mensajeService: MensajesService,
        private _utilService: UtilService
    ){}

    ngOnInit() {

         this.oficios();
    }

    formatFechapresentacion(obj: any) {
        this.destinatario.controls.fecha_presentacion.setValue(this._utilService.formatObjetoAFecha(obj));
    }

    esNumero(obj: any) {
        if (!this._utilService.validarNumero(obj.value)) {
            obj.value = obj.value.substring(0, obj.value.length - 1);
        }
    }

    oficios() {
        this._oficioService.listarOficios().subscribe(
            data => {
                return this.listaOficios = data;
            },
            error => {
              this._mensajeService.cancelado(error, [{name:''}]);
            }
        );
    }

    getOficio(oficio){
        this.destinatario.controls.oficioid.setValue(oficio.id);
    }

    getNombreListadoPorId(id, listado){
      let seleccion = "";
      for (var key in listado) {
          if(listado[key].id == id ){
              seleccion = listado[key].nombre;
          }
      }
      return seleccion;
  }
}
