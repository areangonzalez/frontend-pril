import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AreaEntrenamientoService, MensajesService } from 'src/app/core/services';
import { Persona, Lugar, Destinatario, AreaEntrenamiento, Oferta } from 'src/app/core/models';

@Component({
    selector: 'area-entrenamiento-vista',
    templateUrl: './vista-area-entrenamiento.html',
    styleUrls: ['./vista-area-entrenamiento.css']
})
export class VistaAreaEntrenamientoComponent implements OnInit {

    public areaId:any;
    public lugarPersona = new Lugar(0,0,'','','','','','','');
    public persona = new Persona(0,'','','','','',0,0,0,'','','',this.lugarPersona,[]);
    public destinatario = new Destinatario('',{},'','','',0,0,false,'','','','','', this.persona);
    public lugarOferta = new Lugar(0,0,'','','','','','','');
    public oferta = new Oferta(0,0,'','','','','',this.lugarOferta, '', '');
    public area = new AreaEntrenamiento(0,'',0,0,0,{},'','','','','','','',this.destinatario,this.oferta,'');

    constructor(
      private _router: Router,
      private _route: ActivatedRoute
    ) {}

    ngOnInit() {
        // obtener parametro
        this.configurarAreaEntrenamiento(this._route.snapshot.data['areaEntrenamiento']);
        this.areaId = this._route.snapshot.paramMap.get('area_entrenamientoid');
        if (this.areaId == undefined) {
          this._router.navigate(['/']);
        }
    }

    volver() {
        this._router.navigate(['area']);
    }

    private configurarAreaEntrenamiento(datos:any){
      for (const key in datos) {
        this.area[key] = datos[key];
      }
    }

    obtenerDireccion(lugar:any) {
      let dir = "";
        dir += lugar['localidad'];
        dir += (lugar['barrio'] != '') ? " - Bº " + lugar['barrio'] : '';
        dir += ' - ' + lugar['calle'] + ' ' + lugar['altura'];
        dir += (lugar['escalera'] != '') ? ' - Escalera/Modulo: ' + lugar['escalera'] : '';
        dir += (lugar['piso'] != '') ? ' - Piso: ' + lugar['piso'] : '';
        dir += (lugar['depto'] != '') ? ' - Dpto: ' + lugar['depto'] : '';

        return dir;
    }

    obtenerProfesion(estudios:any){
      let profesion = '';
      if (estudios.length > 0) {
        for (const key in estudios) {
          if(key == "profesion") {
            profesion += (profesion != '' && estudios[key] != '') ? ' - ' : '';
            profesion += estudios[key];
          }
        }
      }
      return (profesion != '') ? profesion : 'N/A';
    }
}
