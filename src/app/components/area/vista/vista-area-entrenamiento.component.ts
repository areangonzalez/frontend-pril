import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from "./../../breadcrumbs/breadcrumbs.service";
import { AreaEntrenamientoService } from 'src/app/services/area-entrenamiento.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Persona } from 'src/app/models/persona.model';
import { Lugar } from 'src/app/models/lugar.model';
import { Representante } from 'src/app/models/representante.model';
import { AmbienteTrabajo } from 'src/app/models/ambiente-trabajo.model';
import { Destinatario } from 'src/app/models/destinatario.model';

@Component({
    selector: 'area-entrenamiento-vista',
    templateUrl: './vista-area-entrenamiento.html',
    styleUrls: ['./vista-area-entrenamiento.css']
})
export class VistaAreaEntrenamientoComponent implements OnInit {

    public areaId:any;
    public lugar = new Lugar(0,0,'','','','','','','');
    public persona = new Persona(0,'','','','','',0,0,0,'','','',this.lugar,[]);
    public representante = new Representante(0,'','','','','','','');
    public ambienteTrabajo = new AmbienteTrabajo(0,'','','','','',0,this.lugar,this.representante,'');
    public destinatario = new Destinatario('',{},'','','',0,0,false,'','','','','', this.persona);
    public area:object = {};

    constructor(
      private breadcrumbsService: BreadcrumbsService,
      private _router: Router,
      private _route: ActivatedRoute,
      private _areaEntrenamientoService: AreaEntrenamientoService,
      private _mensajesService: MensajesService
      ) {
    }

    ngOnInit() {
        this.breadcrumbsService.store([
            { label: 'Inicio', url: 'inicio', params: [] },
            { label: 'Área de entrenamiento', url: 'area', params: [] },
            { label: 'Vista', url: 'area/vista', params: [] }]);
        // obtener parametro
        this.areaId = this._route.snapshot.paramMap.get('id');

        if (this.areaId != undefined) {
          this.areaEntrenamientoPorId(this.areaId);
        }else{
          this._router.navigate(['/']);
        }
    }

    public areas = [
        { fecha_inicial: '07/11/2018', fecha_final: '07/04/2019', tarea: 'Limpieza', destinatario: 'Gomez, Eduardo', ambiente_trabajo: 'Cooperativa obrera', plan: '$5000 / 20hs', estado: 'activo', id: 1 },
        { fecha_inicial: '07/06/2018', fecha_final: '07/08/2018', tarea: 'Cajero', destinatario: 'Fernandez, Nicolas', ambiente_trabajo: 'Panadería Panonto', plan: '$2000 / 20hs', estado: 'Finalizado', id: 2 },
        { fecha_inicial: '07/05/2018', fecha_final: '07/11/2018', tarea: 'Limpieza', destinatario: 'Gonzalez, Carlos', ambiente_trabajo: 'Panadería San Fernando', plan: '$1000 / 5hs', estado: 'activo', id: 3 },
        { fecha_inicial: '07/03/2018', fecha_final: '07/09/2018', tarea: 'Chofer', destinatario: 'Carrizo, Eliana', ambiente_trabajo: 'Coca cola', plan: '$2000 / 10hs', estado: 'activo', id: 4 },
        { fecha_inicial: '07/04/2018', fecha_final: '07/10/2018', tarea: 'Mantenimiento', destinatario: 'Gutierrez, Pablo', ambiente_trabajo: 'Cine gama', plan: '$5000 / 20hs', estado: 'activo', id: 5 }
    ];

    volver() {
        this._router.navigate(['area']);
    }

    private areaEntrenamientoPorId(id) {
      this._areaEntrenamientoService.buscarPorId(id).subscribe(
        datos => {
          this.area = datos;
        }, error => {
          this._mensajesService.cancelado(error, [{name:''}]);
        })
    }
}
