import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from "../../breadcrumbs/breadcrumbs.service";
// servicios
import { OfertaService } from "../../../services/oferta.service";
import { AmbienteTrabajoService } from "../../../services/ambiente-trabajo.service";
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
    public ambiente: Object;

    constructor(
        private breadcrumbsService: BreadcrumbsService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _ofertaService: OfertaService,
        private _ambienteTrabajoService: AmbienteTrabajoService,
        private _mensajeService: MensajesService
    ) {
        this.ambiente = {
            ambiente: {
                id: 0,
                nombre: "Saturno hogar S.A",
                legajo: "",
                observacion: "",
                cuit: "",
                actividad: "Venta de ",
                tipo_ambiente_trabajoid: "",
                lugar: {
                    id: 0,
                    localidadid: "",
                    calle: "",
                    altura: "",
                    barrio: "",
                    piso: "",
                    depto: "",
                    escalera: ""
                }
            },
            persona: {
                id: 0,
                nro_documento: "",
                apellido: "",
                nombre: "",
                telefono: "",
                celular: "",
                fax: "",
                email: ""
            }
        }
    }

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
            this.ambientePorId(this.id);
        }else{
            this._router.navigate(['ambiente']);
        }
    }


    private buscarOfertas(idAmbiente) {
        this._ofertaService.listarOfertas(idAmbiente).subscribe(
            datos => {
                this.listaOfertas = datos;
            }, error => {
                this._mensajeService.cancelado(error, [{ name: '' }]);
            });
    }

    private ambientePorId(id){
        this._ambienteTrabajoService.ambientePorId(id).subscribe(
            datos => {
                for (var key in datos) {
                    this.ambiente[key] = datos[key];
                }
            }, error => {
                this._mensajeService.cancelado(error, [{name:''}]);
            });
    }

    public guardarOferta(datos) {
        this._ofertaService.guardar(datos['params'], datos['id']).subscribe(
            data => {
                this._mensajeService.exitoso('Se ha guardado correctamente la oferta', [{name: ''}]);
                this.buscarOfertas(this.idAmbiente);
            }, error => {
                this._mensajeService.cancelado(error, [{name:''}]);
            });
    }

    public volver(){
        this._router.navigate(['ambiente']);
    }

    public vistaAmbiente(id){
        this._router.navigate(['ambiente', 'vista', id]);
    }

}
