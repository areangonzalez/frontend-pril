import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AreaEntrenamientoService } from 'src/app/core/services/area-entrenamiento.service';
import { MensajesService } from 'src/app/core/services/mensajes.service';


@Component({
    selector: 'app-area-entrenamiento',
    templateUrl: './area-entrenamiento.html',
    // styleUrls: ['./lista.component.css']
})
export class AreaEntrenamientoComponent implements OnInit {
    public areas:any[] = [];

    constructor(
      private _route: ActivatedRoute,
      private _areaEntrenamientoService: AreaEntrenamientoService,
      private _mensajesService: MensajesService
    ) {}

    ngOnInit() {
      // Obtener listado de area de entrenamiento
      this.areas = this._route.snapshot.data['listadoAreas'];
    }

    buscar(params:any) {
       Object.assign(params, {page: 0});
      this._areaEntrenamientoService.buscar(params).subscribe(
        busqueda => {
          this.areas = busqueda;
      }, error => { this._mensajesService.cancelado(error, [{name:''}]); })
    }
}
