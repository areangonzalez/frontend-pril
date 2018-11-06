import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from "../../breadcrumbs/breadcrumbs.service";
// services
import { AmbienteTrabajoService } from "../../../services/ambiente-trabajo.service";
import { OfertaService } from "../../../services/oferta.service";
import { MensajesService } from "../../../services/mensajes.service";

@Component({
    selector: 'ambiente-trabajo-vista',
    templateUrl: './vista-ambiente-trabajo.html',
    styleUrls: ['./vista-ambiente-trabajo.css']
})
export class VistaAmbienteTrabajoComponent {
    public listaOfertas:any;
    private id:any;
    public idAmbiente:number;
    public ambiente:object;

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

    volver() {
        this._router.navigate(['ambiente']);
    }

    editarAmbiente(id) {
        this._router.navigate(['ambiente', 'editar', id]);
    }

    agregarOferta(id) {
        this._router.navigate(['ambiente', id, 'ofertas']);
    }

    private buscarOfertas(id){
        this._ofertaService.listarOfertas(id).subscribe(
            datos => {
                this.listaOfertas = datos;
                console.log(this.listaOfertas);
            }, error => {
                this._mensajeService.cancelado(error, [{name:''}]);
            });
    }

    private ambientePorId(id) {
        this._ambienteTrabajoService.ambientePorId(id).subscribe(
            datos => {
                this.ambiente = datos;
            }, error => {
                this._mensajeService.cancelado(error, [{ name: '' }]);                
            });
    }

}
