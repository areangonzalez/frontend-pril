
import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
//services
import { DestinatarioService, MensajesService } from "../../core/services";

@Component({
    selector: 'datos-destinatario-vista',
    templateUrl: './datos-destinatario-vista.component.html',
    styleUrls: ['./datos-destinatario-vista.component.css'],
    providers: [NgbTooltipConfig]
})
export class DatosDestinatarioVistaComponent {
    //title = 'app';
    private id: any;
    private idDestinatario = '';
    public destinatario: any = { persona: { lugar: {}, estudios: [] }, destinatario: {} };


    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _mensajesService: MensajesService,
        private _destinatarioService: DestinatarioService,
        config: NgbTooltipConfig
    ) {
        config.placement = 'top';
        config.triggers = 'click';
    }

    ngOnInit() {
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

    private destinatarioPorId(id) {
        this._destinatarioService.destinatarioPorId(id).subscribe(
            datos => {
                this.destinatario = datos;
            }, error => {
                this._mensajesService.cancelado(error, [{ name: '' }]);
            });
    }

}
