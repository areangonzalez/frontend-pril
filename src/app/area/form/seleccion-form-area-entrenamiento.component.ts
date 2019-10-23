import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// services
import { OfertaService, DestinatarioService, MensajesService } from '../../core/services';


@Component({
    selector: 'area-entrenamiento-form-seleccion',
    templateUrl: './seleccion-form-area-entrenamiento.html',
    styleUrls: ['./seleccion-form-area-entrenamiento.css']
})
export class SeleccionFormAreaEntrenamientoComponent implements OnInit {
    page = 1;
    public ofertas:any = {};
    public destinatarios: any = {};
    public destinatarioId:number = 0;
    public ofertaId:number = 0;
    public totalOfertas: number = 0;
    public totalDestinatarios: number = 0;

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _ofertaService: OfertaService,
      private _destinatarioService: DestinatarioService,
      private _mensajesService: MensajesService
    ) {}

    ngOnInit() {
      this.destinatarios = this._route.snapshot.data['destinatarios'];
      /* this.ofertas = this._route.snapshot.data['ofertas']; */
      this.listarOfertas();
    }

    private listarOfertas(){
      this._ofertaService.listarOfertas('').subscribe(
        datos => {
          this.ofertas = datos;
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

    destinatarioElegido(destinatario){
      console.log("Seleccion de destinatario: ",destinatario);
      if (destinatario != null) {
        this.destinatarioId = destinatario.id;
        this.ofertaId = 0;
        /* this._ofertaService.buscarOfertaPor(destinatario).subscribe(
          datos => {
            this.ofertas = datos;
          }, error => {
            this._mensajesService.cancelado(error, [{name:''}]);
          }); */
      } else {
        this.destinatarioId = 0;
        this.listarOfertas();
      }
    }

    ofertaElegida(oferta){
      if (oferta != null) {
        this.ofertaId = oferta.id;
      }else{
        this.ofertaId = 0;
      }
    }

    seguirCreando(){
      if (this.destinatarioId != 0 && this.ofertaId != 0){
        this._router.navigate(['inicio','area-entrenamiento', 'crear-plan', this.destinatarioId, this.ofertaId]);
      }else{
        this._mensajesService.cancelado('Por favor verifique los datos!!!', [{'name':''}]);
        // aviso si falta algo.
      }
    }
}
