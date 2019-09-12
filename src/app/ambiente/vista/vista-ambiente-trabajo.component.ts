import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from "../../shared/breadcrumbs/breadcrumbs.service";
// services
import { AmbienteTrabajoService } from "../../core/services/ambiente-trabajo.service";
import { OfertaService } from "../../core/services/oferta.service";
import { MensajesService } from "../../core/services/mensajes.service";
// models
import { Representante } from "../../core/models/representante.model";
import { Lugar } from "../../core/models/lugar.model";
import { AmbienteTrabajo } from "../../core/models/ambiente-trabajo.model";

@Component({
    selector: 'ambiente-trabajo-vista',
    templateUrl: './vista-ambiente-trabajo.html',
    styleUrls: ['./vista-ambiente-trabajo.css']
})
export class VistaAmbienteTrabajoComponent {
    /**
     * @var listaOfertas Array que contiene el listado de ofertas
     * @var id identificador del ambiente de trabajo para uso privado del componente
     * @var idAmbiente identificador del ambiente de trabajo para uso publico del componente
     * @var lugar modelo para instanciar lugar
     * @var persona modelo para instanciar el representante
     * @var ammbiente modelo para instanciar el ambiente
     */
    public listaOfertas:any[]= [];
    private id:any;
    public idAmbiente:number;
    public lugar = new Lugar(0,0,'','','','','','','');
    public persona = new Representante(0,'','','','','','');
    public ambiente = new AmbienteTrabajo(0, '', '', '', '', '', 0, this.lugar, this.persona, '', '', '', '', '', '');

    /**
     *
     * @param _router Servicio para la utilizacion de la navegacion de la pagina
     * @param _route servicio utilizado para capturar llos parametros de la url
     * @param _breadcrumbsService servicio para el breadcrumb
     * @param _ambienteTrabajoService servicio para reutilizar las ejecuciones hacia la api de ambiente de trabajo
     * @param _ofertaService servicio para reutilizar las ejecuciones hacia la api de ofertas
     * @param _mensajeService  servicio para la ejecución y visualizacion de mensajes hacia el cliente
     */
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _breadcrumbsService: BreadcrumbsService,
        private _ambienteTrabajoService: AmbienteTrabajoService,
        private _ofertaService: OfertaService,
        private _mensajeService: MensajesService
    ) { }

    ngOnInit() {
        // breadcrumbs Dinamico
        this._breadcrumbsService.store([{ label: 'Inicio', url: 'inicio', params: [] }, { label: 'Ambiente de trabajo', url: 'ambiente', params: [] }, { label: 'Ver', url: 'ambiente/vista', params: [] }]);
        this.id = this._route.snapshot.paramMap.get('id');
        if (this.id != undefined) {
            this.idAmbiente = this.id;
            this.buscarOfertas(this.id);
            this.ambientePorId(this.id);
        } else {
            this._router.navigate(['ambiente']);
        }
    }
    /**
     * @function volver utilizada para volver al listado de amabiente de trabajo.
     */
    volver() {
        this._router.navigate(['ambiente']);
    }
    /**
     * @function editarAmbiente utilizada para redirigir el componente a la edicion de un ambiente de trabajo
     * @param id identificador para el ambiente de trabajo
     */
    editarAmbiente(id) {
        this._router.navigate(['ambiente', 'editar', id]);
    }
    /**
     * @function agregarOferta utilizada para ir agregar una oferta
     * @param id identificador de ambiente de trabajo
     */
    agregarOferta(id) {
        this._router.navigate(['ambiente', id, 'ofertas']);
    }
    /**
     * @function buscarOfertas utilizada para obtener el listado de ofertas del ambiente de trabajo
     * @param id identificador de ambiente de trabajo
     */
    private buscarOfertas(id){
        this._ofertaService.listarOfertas(id).subscribe(
            datos => {
                this.listaOfertas = datos;
            }, error => {
                this._mensajeService.cancelado(error, [{name:''}]);
            });
    }
    /**
     * @function ambientePorId obtiene los datos del ambiente a visualizar
     * @param id identificador del ambiente de trabajo
     */
    private ambientePorId(id) {
        this._ambienteTrabajoService.ambientePorId(id).subscribe(
            datos => {
              this.ambiente.deserialize(datos);
              this.ambiente.persona.deserialize(datos['persona']);
              console.log(this.ambiente);
            }, error => {
                this._mensajeService.cancelado(error, [{ name: '' }]);
            });
    }

}
