import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-ambiente-trabajo',
    templateUrl: './ambiente-trabajo.html',
    // styleUrls: ['./lista.component.css']
})

export class AmbienteTrabajoComponent implements OnInit {
    public ambientes:any;
    public page = 1;
    public totalFiltrado:number = 0;

    /**
     * Inicializacion de servicios utiles para el componente
     * @param _ambienteTrabajoService servicio que maneja la conexion con el api
     * @param _mensajeService servicio que maneja los mensajes para el usuario
     */
    constructor(
        private _route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
      //obtengo una lista de ambientes de trabajo
      this.ambientes = this._route.snapshot.data['ambientes']['resultado'];
      this.totalFiltrado = this._route.snapshot.data['ambientes']['total_filtrado'];     
      console.log(this.ambientes);
      
    }
}
