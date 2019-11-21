import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinatarioService, MensajesService } from '../core/services';
import { ConfigurarPagina } from "../core/models";
import { ConfiguracionParaPaginarService } from 'src/app/core/utils';

@Component({
    selector: 'app-destinatario',
    templateUrl: './destinatario.html',
    providers: [ConfiguracionParaPaginarService]
})
@Injectable()
export class DestinatarioComponent implements OnInit {
    public destinatariosLista: any[] = [];
    public filtradoBusqueda:any = {}; // variable que mantiene el filtro de busqueda
    public configPaginacion:ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de destinatarios

    constructor(
        private _route: ActivatedRoute, 
        private _destinatarioService: DestinatarioService, 
        private _mensajeService: MensajesService, 
        private _confPaginacion: ConfiguracionParaPaginarService
      ) {
    }

    ngOnInit(){
      //obtengo lista de destinatarios
      this.config(this._route.snapshot.data['destinatarios'], 1);
    }
    /**
     * Solicito el cambio de pagina
     * @param pagina [number] numero de pagina
     */
    cambiarPagina(pagina: any) {
      this.buscar(this.filtradoBusqueda, pagina);
    }
    /**
     * Se configura paginacion y listado de destinatario
     * @param destinatarios [Object] objeto que contiene los valores de paginacion y listado de destinatario
     */
    public config(datos:any, pagina:number) {
      // configuracion de paginación
      this.configPaginacion = this._confPaginacion.config(datos, pagina);
      // total de registros
      this.destinatariosLista = datos.resultado;
    }

    /**
     * Configurar busqueda avanzada para mostrar listado
     * @param params [object] parametros que se filtraran en la busqueda
     * @param page [number] Es el numero de pagina menos 1
     */
    buscar(params:any, page:number) {
      Object.assign(params, {page: page-1});
      console.log(params);
      
      this.filtradoBusqueda = params;
      this._destinatarioService.buscar(params).subscribe(
        respuesta => {
          this.config(respuesta, page);
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
    }

    /**
     * limpia los campos del formulario de busqueda
     * @param e [boolean] valor identificable para limpiar los campos y realizar la busqueda
     */
    limpiarCampos(e:boolean) {
      this.buscar({}, 1);
    }
}
