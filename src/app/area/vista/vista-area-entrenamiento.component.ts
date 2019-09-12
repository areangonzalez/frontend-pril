import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AreaEntrenamientoService, MensajesService } from 'src/app/core/services';
import { Persona, Lugar, Representante, AmbienteTrabajo, Destinatario } from 'src/app/core/models';

@Component({
    selector: 'area-entrenamiento-vista',
    templateUrl: './vista-area-entrenamiento.html',
    styleUrls: ['./vista-area-entrenamiento.css']
})
export class VistaAreaEntrenamientoComponent implements OnInit {

    public areaId:any;
    public lugar = new Lugar(0,0,'','','','','','','');
    public persona = new Persona(0,'','','','','',0,0,0,'','','',this.lugar,[]);
    public representante = new Representante(0,'','','','','','');
    public ambienteTrabajo = new AmbienteTrabajo(0,'','','','','',0,this.lugar,this.representante,'','','','','','');
    public destinatario = new Destinatario('',{},'','','',0,0,false,'','','','','', this.persona);
    public area:object = {};

    constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _areaEntrenamientoService: AreaEntrenamientoService,
      private _mensajesService: MensajesService
      ) {
    }

    ngOnInit() {
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
