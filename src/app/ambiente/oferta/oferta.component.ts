import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
// servicios
import { OfertaService } from "../../core/services/oferta.service";
import { AmbienteTrabajoService } from "../../core/services/ambiente-trabajo.service";
import { MensajesService } from "../../core/services/mensajes.service";

@Component({
    selector: 'ambiente-trabajo-oferta',
    templateUrl: './oferta.html',
    styleUrls: ['./oferta.css']
})
export class OfertaComponent implements OnInit {
    public lista_ofertas: any;
    public id:any;
    public idAmbiente = '';
    public ambiente: any;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _ofertaService: OfertaService,
        private _ambienteTrabajoService: AmbienteTrabajoService,
        private _mensajeService: MensajesService
    ) {}

    ngOnInit() {
        this.idAmbiente = this._route.snapshot.paramMap.get('ambienteid');
        this.ambiente = this._route.snapshot.data['ambiente'];
        this.lista_ofertas = this._route.snapshot.data['ofertaLista']['resultado'];
        
        if (this.idAmbiente == undefined) {
            this._router.navigate(['ambiente']);
        }
    }


    private buscarOfertas(idAmbiente) {
        this._ofertaService.listarOfertas(idAmbiente).subscribe(
            datos => {                
                this.lista_ofertas = datos['resultado'];
            }, error => {
                this._mensajeService.cancelado(error, [{ name: '' }]);
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
        this._router.navigate(['inicio','ambiente']);
    }

    public vistaAmbiente(id){
        this._router.navigate(['inicio','ambiente', 'vista', id]);
    }

}
