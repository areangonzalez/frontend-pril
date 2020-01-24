import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TipoAmbienteTrabajoService } from 'src/app/core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'admin-vista-tipo-ambiente-trabajo',
    templateUrl: './vista-tipo-ambiente-trabajo.component.html'
})
export class VistaTipoAmbienteTrabajoComponent implements OnInit {
  public titulos: string[] = [];
  public listado: any = [];
  public objArmarForm: any = [];

  constructor(
      private _router: Router, private _route: ActivatedRoute, private _tipoAmbienteTrabajo: TipoAmbienteTrabajoService, private _toastrService: ToastrService
    ) {
  }

  ngOnInit() {
    this.renderTabla(this._route.snapshot.data['tipoAmbienteTrabajos']);
  }

  /**
     * Separo los datos de la lista para obtener sus propiedades
     * @param listado listado de oficios
     */
    renderTabla(listado: any) {
      this.titulos = Object.keys(listado[0]);
      this.listado = listado;
      this.objArmarForm = listado[0];
    }
    /**
     * guardado de un elemento nuevo o editado.
     * @param datos datos a guardar
     */
    guardar(datos:any) {
      if (datos !== false){
        if (datos["id"] == 0){
          this._tipoAmbienteTrabajo.guardar(datos, 0).subscribe(
            respuesta => {
              this._toastrService.success('Se ha creado un nuevo oficio!!!');
              this.refrescarListado();
            }, error => { this._toastrService.error(error); });
        }else{
          this._tipoAmbienteTrabajo.guardar(datos, datos["id"]).subscribe(
            respuesta => {
              this._toastrService.success('El oficio se ha editado correctamente!!!');
              this.refrescarListado();
          }, error => { this._toastrService.error(error); });
        }
      }
    }
    /**
     * refresca el listado con nuevos datos
     */
    refrescarListado() {
      this._tipoAmbienteTrabajo.listado().subscribe(
        respuesta => {
          this.listado = respuesta;
        })
    }
    /**
     * borra un elemento del listado
     * @param id numero de identificador del elemento a borrar
     */
    borrar(id:number) {
      this._tipoAmbienteTrabajo.borrar(id).subscribe(
        respuesta => {
          this._toastrService.success("Se ha borrado el oficio correctamente.");
          this.refrescarListado();
        }, error => { this._toastrService.error(error); });
    }
}
