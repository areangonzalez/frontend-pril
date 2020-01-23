import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OficioService, } from '../../core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'admin-vista-oficio',
    templateUrl: './vista-oficio.component.html'
})
export class VistaOficioComponent implements OnInit {
  public titulos: string[] = [];
  public listado: any = [];
  public objArmarForm:any = [];

    constructor(
        private _router: Router, private _route: ActivatedRoute, private _oficioService: OficioService, private _toastrService: ToastrService
      ) {

    }

    ngOnInit() {
      this.renderTabla(this._route.snapshot.data['oficios']);
    }
    /**
     * Separo los datos de la lista para obtener sus propiedades
     * @param listaOficio listado de oficios
     */
    renderTabla(listaOficio: any) {
      this.titulos = Object.keys(listaOficio[0]);
      this.listado = listaOficio;
      this.objArmarForm = listaOficio[0];
    }

    guardar(datos:any) {
      if (datos["id"] == 0){
        this._oficioService.guardar(datos, 0).subscribe(
          respuesta => {
            this._toastrService.success('Se ha creado un nuevo oficio!!!');
            this.refrescarListado();
          });
      }else{
        this._oficioService.guardar(datos, datos["id"]).subscribe(
          respuesta => {
            this._toastrService.success('El oficio se ha editado correctamente!!!');
            this.refrescarListado();
        });
      }
    }

    refrescarListado() {
      this._oficioService.listarOficios().subscribe(
        respuesta => {
          this.listado = respuesta;
        })
    }

}
