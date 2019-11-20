import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// services
import { OfertaService, DestinatarioService, MensajesService } from '../../core/services';
import { ConfigurarPagina } from "../../core/models";
import { ConfiguracionParaPaginarService } from 'src/app/core/utils';


@Component({
    selector: 'area-entrenamiento-form-seleccion',
    templateUrl: './seleccion-form-area-entrenamiento.html',
    styleUrls: ['./seleccion-form-area-entrenamiento.css'],
    providers: [ConfiguracionParaPaginarService]
})
export class SeleccionFormAreaEntrenamientoComponent implements OnInit {
    public ofertas:any; // listado de ofertas
    public confOfertas: ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de ofertas
    public filtroBusquedaOferta: any = {}; // filtro de busqueda de oferta
    public destinatarios: any; // listado de destinatarios
    public confDestinatario: ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de destinatarios
    public destinatarioId:number = 0; // variable que gestiona el id del destinatario
    public ofertaId:number = 0; // variable que gestiona el id de oferta
    public filtroBusquedaDestinatario: any = {}; // filtro de busqueda de destinatario

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _ofertaService: OfertaService,
      private _destinatarioService: DestinatarioService,
      private _mensajesService: MensajesService,
      private _confPaginacion: ConfiguracionParaPaginarService
    ) {}

    ngOnInit() {
      this.listarDestinatarios(this.filtroBusquedaDestinatario, 1);
      this.listarOfertas(this.filtroBusquedaOferta, 1);
    }
    /**
     * Obtiene el listado de destinatarios
     * @param params parametros de busqueda
     */
    private listarDestinatarios(params:any, page:number){
      Object.assign(params, { "page": (page - 1) });
      this._destinatarioService.buscar(params).subscribe(
        datos => {
          this.confDestinatario = this._confPaginacion.config(datos, page);
          this.destinatarios = datos['resultado'];
        }, error => { this._mensajesService.cancelado(error, [{name: ''}]); })
    }
    /**
     * Obtiene el listado de ofertas
     * @param params parametros de busqueda
     */
    private listarOfertas(params:any, page: number){
      Object.assign(params, {"page": (page - 1)});
      this._ofertaService.buscarOfertaPor(params).subscribe(
        datos => {
          console.log(datos);
          this.confOfertas = this._confPaginacion.config(datos, page);
          this.ofertas = datos['resultado'];
        }, error => {
          this._mensajesService.cancelado(error, [{name:''}]);
        });
      }
    /**
     * Cancelacion del formulario
     */
    cancelar() {
        this._router.navigate(['inicio','area-entrenamiento']);
    }
    /**
     * Setea el id del destinatario elegido
     * @param destinatario objeto que contiene al destinatario seleccionado
     */
    destinatarioElegido(destinatario:any){
      if (destinatario) {
        this.destinatarioId = destinatario.id;
      } else {
        this.destinatarioId = 0;
        this.ofertaId = 0;
        this.listarOfertas(this.filtroBusquedaOferta, 1);
      }
    }
    /**
     * Setea el id de la oferta elegida
     * @param oferta objeto que contiene el id de la oferta seleccionada
     */
    ofertaElegida(oferta:any){
      if (oferta) {
        this.ofertaId = oferta.id;
      }else{
        this.destinatarioId = 0;
        this.ofertaId = 0;
        this.listarDestinatarios(this.filtroBusquedaDestinatario, 1);
      }
    }
    /**
     * Obtiene los id de oferta y destinatario y son enviados por router
     * a la segunda parte del formulario
     */
    seguirCreando(){
      if (this.destinatarioId != 0 && this.ofertaId != 0){
        this._router.navigate(['inicio','area-entrenamiento', 'crear-plan', this.destinatarioId, this.ofertaId]);
      }else{
        // aviso si falta algo.
        this._mensajesService.cancelado('Por favor verifique los datos!!!', [{'name':''}]);
      }
    }

    /**
     * Solicito el cambio de pagina para el listado de destinatario
     * @param pagina [number] numero de pagina
     */
    cambiarPaginaDestinatario(pagina: number) {
      this.listarDestinatarios(this.filtroBusquedaDestinatario, pagina);
    }

    /**
     * Solicito el cambio de pagina para las ofertas
     * @param pagina [number] numero de pagina
     */
    cambiarPaginaOfertas(pagina: number) {
      this.listarDestinatarios(this.filtroBusquedaOferta, pagina);
    }

}
