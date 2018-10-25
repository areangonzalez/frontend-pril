import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from "../../breadcrumbs/breadcrumbs.service";
// servicios
import { OfertaService } from "../../../services/oferta.service";
import { MensajesService } from "../../../services//mensajes.service";

@Component({
    selector: 'ambiente-trabajo-oferta',
    templateUrl: './oferta.html',
    styleUrls: ['./oferta.css']
})
export class OfertaComponent implements OnInit {
    public listaOfertas: Object;
    private id:any;
    public idAmbiente = '';

    constructor(
        private breadcrumbsService: BreadcrumbsService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _ofertaService: OfertaService,
        private _mensajeService: MensajesService
    ) {}

    ngOnInit() {
        this.breadcrumbsService.store([
            { label: 'Inicio', url: 'inicio', params: [] },
            { label: 'Ambiente de trabajo', url: 'ambiente', params: [] },
            { label: 'Agregar oferta', url: 'ambiente/oferta/agregar', params: [] }
        ]);
        this.id = this._route.snapshot.paramMap.get('id');
        if (this.id != undefined) {
            this.idAmbiente = this.id;
            this.buscarOfertas(this.id);
        }else{
            this._router.navigate(['ambiente']);
        }
    }


    private buscarOfertas(idAmbiente) {
        this._ofertaService.listarOfertas(idAmbiente).subscribe(
            datos => {
                console.log(datos);
                this.listaOfertas = datos;
            });
    }

    public guardarOferta(datos) {
        this._ofertaService.guardar(datos['params'], datos['id']).subscribe(
            data => {
                this._mensajeService.exitoso('Se ha guardado correctamente la oferta', [{name: ''}]);
                //this._mensajeService.ofrecer('Se ha guardado correctamente la oferta', [{ name: '', tipo: 'continuar' }, { name: 'ambiente/vista', tipo: 'vista' }]);
            }, error => {
                this._mensajeService.cancelado(error, [{name:''}]);
            });
    }

}
