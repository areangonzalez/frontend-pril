import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
// services
import { AmbienteTrabajoService } from "../core/services/ambiente-trabajo.service";
import { MensajesService } from "../core/services/mensajes.service";

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
        private _ambienteTrabajoService: AmbienteTrabajoService,
        private _mensajeService: MensajesService
    ) {
    }

    ngOnInit() {
        this.listaAmbientes();
    }

    private listaAmbientes() {
        this._ambienteTrabajoService.listarAmbienteTrabajo()
        .map(listaAmbientes => {
          let listarDatos: any[] = [];
          this.totalFiltrado = listaAmbientes['total_filtrado'];
          // armo el listado de ambientes de trabajo
          listaAmbientes['coleccion'].forEach(el => {
            let direccion:string = '';
            let telefonos:string = '';
            // armo la direccion de ambiente de trabajo
            direccion = el.lugar.localidad + ' - ' + el.lugar.calle + ' ' + el.lugar.altura;
            direccion += (el.lugar.barrio != '') ? ' - Barrio: ' + el.lugar.barrio:'';
            direccion += (el.lugar.escalera != '') ? ' - Esc/Mod: ' + el.lugar.escalera:'';
            direccion += (el.lugar.piso != '') ? ' - Piso: ' + el.lugar.piso:'';
            direccion += (el.lugar.depto != '') ? ' - Dpto: ' + el.lugar.depto:'';
            // armo un listado de telefonos de ambiente de trabajo
            telefonos = (el.telefono1 != '') ? el.telefono1 : '';
            if (el.telefono2 != ''){
              telefonos += (telefonos != '') ? ' / ' + el.telefono2 : el.telefono2;
            }
            if (el.telefono3 != ''){
              telefonos += (telefonos != '') ? ' / ' + el.telefono3 : el.telefono3;
            }
            // armo el objeto del listado
            listarDatos.push({
              // datos del representante
              representante: el.persona.apellido + ', ' + el.persona.nombre,
              rep_telefono: el.persona.telefono,
              rep_celular: el.persona.celular,
              rep_email: el.persona.email,
              //datos de ambiente
              nombre: el.nombre,
              fax: el.fax,
              email: el.email,
              cuit: el.cuit,
              tipo_ambiente_trabajo: el.tipo_ambiente_trabajo,
              estado: el.estado,
              id: el.id,
              direccion: direccion,
              telefonos: telefonos
            });

          });
          return listarDatos;
        })
        .subscribe(
            datos => {
                this.ambientes = datos;
                //this.totalFiltrado = datos['total_filtrado'];
            }, error => {
                this._mensajeService.cancelado(error, [{ name: '' }]);
            }
        );
    }
}
