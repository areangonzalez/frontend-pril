import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// services
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
     * @param _ofertaService servicio para reutilizar las ejecuciones hacia la api de ofertas
     * @param _mensajeService  servicio para la ejecución y visualizacion de mensajes hacia el cliente
     */
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _ofertaService: OfertaService,
        private _mensajeService: MensajesService
    ) { }

    ngOnInit() {
        // breadcrumbs Dinamico
        this.id = this._route.snapshot.paramMap.get('ambienteid');
        this.ambiente = this._route.snapshot.data['ambiente'];
        this.listaOfertas = this._route.snapshot.data['ofertaLista']['resultado'];

        if (this.id == undefined) {
            this._router.navigate(['inicio','ambiente']);
        }
    }
    /**
     * @function volver utilizada para volver al listado de amabiente de trabajo.
     */
    volver() {
        this._router.navigate(['inicio','ambiente']);
    }
    /**
     * @function editarAmbiente utilizada para redirigir el componente a la edicion de un ambiente de trabajo
     * @param id identificador para el ambiente de trabajo
     */
    editarAmbiente(id) {
        this._router.navigate(['inicio','ambiente', 'editar', id]);
    }
    /**
     * @function agregarOferta utilizada para ir agregar una oferta
     * @param id identificador de ambiente de trabajo
     */
    agregarOferta(id) {
        this._router.navigate(['inicio','ambiente', id, 'ofertas']);
    }
    /**
     * @function buscarOfertas utilizada para obtener el listado de ofertas del ambiente de trabajo
     * @param id identificador de ambiente de trabajo
     */
    private buscarOfertas(id){
        this._ofertaService.listarOfertas(id).subscribe(
            datos => {
                this.listaOfertas = datos['resultado'];
            }, error => {
                this._mensajeService.cancelado(error, [{name:''}]);
            });
    }
}
