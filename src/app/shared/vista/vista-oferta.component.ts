import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { MensajesService } from "../../core/services/mensajes.service";
import { OfertaService } from "../../core/services/oferta.service";

@Component({
    selector: 'oferta-vista',
    templateUrl: './vista-oferta.html',
    styleUrls: ['./vista-oferta.css']
})
export class VistaOfertaComponent implements OnInit {
    @Input("ofertaid") public ofertaid;
    public datosOferta = {
        id: 0,
        ambienteid: "",
        nombre_sucursal: "",
        puesto: "",
        area: "",
        demanda_laboral: "",
        objetivo: "",
        dia_horario: "",
        tarea: "",
        fecha_inicial: "",
        lugar: {
            id: 0,
            localidadid: "",
            calle: "",
            altura: "",
            barrio: "",
            piso: "",
            depto: "",
            escalera: "",
            localidad: ""
        }
    };

    constructor(
        private _ofertaService: OfertaService,
        private _mensajesService: MensajesService
    ) { }

    ngOnInit(): void {
        this.ofertaPorId(this.ofertaid);
    }


    ofertaPorId(id) {
        this._ofertaService.getOfertaPorId(id).subscribe(
            datos => {
                for (var key in datos) {
                    this.datosOferta[key] = datos[key];
                }
            }, error => {
                this._mensajesService.cancelado('Ups hubo un problema, por favor verifique los datos.', [{name: ''}])
            }
        );
    }

}
