import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "../../breadcrumbs/breadcrumbs.service";
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
//services
import { DestinatarioService } from "../../../services/destinatario.service";
import { MensajesService } from "../../../services/mensajes.service";

@Component({
    selector: 'destinatario-vista',
    templateUrl: './vista-destinatario.html',
    styleUrls: ['./vista-destinatario.css'] ,
    providers: [NgbTooltipConfig]
})
export class VistaDestinatarioComponent {
    //title = 'app';
    private id:any;
    private idDestinatario = '';
    public destinatario:any = {persona: {lugar: {}, estudios: []}, destinatario:{}};


    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _breadcrumbsService: BreadcrumbsService,
        private _mensajesService: MensajesService,
        private _destinatarioService: DestinatarioService,
        config: NgbTooltipConfig
){
        config.placement = 'top';
        config.triggers = 'click';
}

    ngOnInit() {
        // breadcrumbs Dinamico
        this._breadcrumbsService.store([{ label: 'Inicio', url: 'inicio', params: [] }, { label: 'Destinatario', url: 'destinatario', params: [] }, { label: 'Ver', url: 'destinatario/vista', params: [] }]);
        this.id = this._route.snapshot.paramMap.get('id');
        if (this.id != undefined) {
            this.idDestinatario = this.id;
            this.destinatarioPorId(this.id);
        }
    }

    volver() {
        this._router.navigate(['destinatario']);
    }

    editar() {
        this._router.navigate(['destinatario/editar', this.idDestinatario]);
    }

    private destinatarioPorId(id){
        this._destinatarioService.destinatarioPorId(id,false).subscribe(
            datos => {
                    this.destinatario = datos;
        }, error => {
            this._mensajesService.cancelado(error, [{ name: '' }]);
        });
    }

}
 