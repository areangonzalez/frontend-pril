import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanService } from 'src/app/core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'admin-vista-plan',
    templateUrl: './vista-plan.component.html'
})
export class VistaPlanComponent implements OnInit {
  public titulos: string[] = [];
  public listado: any = [];
  public objArmarForm:any = [];

  constructor(
      private _router: Router, private _route: ActivatedRoute, private _planService: PlanService, private _toastrService: ToastrService
    ) {
  }

  ngOnInit() {
    this.renderTabla(this._route.snapshot.data['planes']);
  }

  /**
     * Separo los datos de la lista para obtener sus propiedades
     * @param listado listado que obtengo del servicio
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
          this._planService.guardar(datos, 0).subscribe(
            respuesta => {
              this._toastrService.success('Se ha creado un nuevo plan!!!');
              this.refrescarListado();
            }, error => { this._toastrService.error(error); });
        }else{
          this._planService.guardar(datos, datos["id"]).subscribe(
            respuesta => {
              this._toastrService.success('El plan se ha editado correctamente!!!');
              this.refrescarListado();
            }, error => { this._toastrService.error(error); });
        }
      }
    }
    /**
     * refresca el listado con nuevos datos
     */
    refrescarListado() {
      this._planService.listar().subscribe(
        respuesta => {
          this.listado = respuesta;
        })
    }
    /**
     * borra un elemento del listado
     * @param id numero de identificador del elemento a borrar
     */
    borrar(id:number) {
      this._planService.borrar(id).subscribe(
        respuesta => {
          this._toastrService.success("Se ha borrado el plan correctamente.");
          this.refrescarListado();
        }, error => { this._toastrService.error(error); });
    }
}
