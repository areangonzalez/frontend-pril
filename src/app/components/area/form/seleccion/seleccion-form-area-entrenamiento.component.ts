import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "../../../breadcrumbs/breadcrumbs.service";
// services
import { OfertaService } from '../../../../services/oferta.service'
import { DestinatarioService } from '../../../../services/destinatario.service'


@Component({
    selector: 'area-entrenamiento-form-seleccion',
    templateUrl: './seleccion-form-area-entrenamiento.html',
    styleUrls: ['./seleccion-form-area-entrenamiento.css']
})
export class SeleccionFormAreaEntrenamientoComponent implements OnInit {
    page = 1;
    public ofertas:any[];
    public destinatarios: any[];

    constructor(
        private breadcrumbsService: BreadcrumbsService,
        private _router: Router,
        private _ofertaService: OfertaService,
        private _destinatarioService: DestinatarioService
    ) {}

    ngOnInit() {
        this.breadcrumbsService.store([{ label: 'Inicio', url: 'inicio', params: [] },{ label: 'Área de entrenamiento', url: 'area', params: [] },{ label: 'Crear', url: 'area/crear/seleccion', params: [] }]);
      this.listarOfertas();
    }

    private listarOfertas(){
      this._ofertaService.listarOfertas('').subscribe(
        datos => {
          console.log(datos)
          this.ofertas = datos['coleccion'];
        }, error => {

        });
    }

    private listarDestinatario(){
      this._destinatarioService.listarDestinatario().subscribe(
        datos => {
          //this.destinatarios =
        }, error => {

        });
    }



    cancelar() {
        this._router.navigate(['area']);
    }

    crearArea(){
        this._router.navigate(['area', 'crear-plan']);
    }
}
