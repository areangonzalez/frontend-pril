import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

// service
import { MensajesService } from "../../../../services/mensajes.service";
import { DestinatarioService } from '../../../../services/destinatario.service'

@Component({
    selector: 'area-entrenamiento-vista-destinatario',
    templateUrl: './vista-destinatario-area-entrenamiento.html',
    styleUrls: ['./vista-destinatario-area-entrenamiento.css'],
    providers: [NgbTooltipConfig]
})
export class VistaDestinatarioAreaEntrenamientoComponent implements OnInit {
    @Input('destinatarioid') public destinatarioid;
    @Input('datosDestinatario') public datosDestinatario;
    public destinatario = {
      id: 0,
      oficio: "",
      legajo: "",
      fecha_ingreso: "",
      origen: "",
      deseo_lugar_entrenamiento: "",
      deseo_actividad: "",
      fecha_presentacion: "",
      banco_cbu: "",
      banco_nombre: "",
      banco_alias: "",
      experiencia_laboral: 0,
      conocimientos_basicos: "",
      profesion: "",
      persona: {
        nombre: "",
        apellido: "",
        nro_documento: "",
        cuil: "",
        telefono: "",
        celular: "",
        email: "",
        fecha_nacimiento: "",
        // estudios: [
        //   {
        //     nivel_educativoid: 0,
        //     nivel_educativo: "",
        //     titulo: "",
        //     completo: 0,
        //     en_curso: 0,
        //     anio: ""
        //   }
        // ],
        sexo: "",
        genero: "",
        estado_civil: "",
        lugar: {
          calle: "",
          altura: "",
          barrio: "",
          piso: "",
          depto: "",
          escalera: "",
          localidad: ""
        }
      }
        }

    constructor(
        private _router: Router,
        private _mensajesService: MensajesService,
        private _destinatarioService: DestinatarioService,
        config: NgbTooltipConfig
    ) {
        config.placement = 'top';
        config.triggers = 'click';
    }

    ngOnInit(){
      //this.destinatarioPorId(this.destinatarioid);
      if (this.datosDestinatario != undefined){
        this.mostrarDatos(this.datosDestinatario);
      }
    }

    destinatarioPorId(id){
      this._destinatarioService.destinatarioPorId(id).subscribe(
        datos => {
          this.destinatario = datos;
        }, error => {
          this._mensajesService.cancelado(error, [{name:''}]);
        });
    }

    mostrarDatos(destinatario){
      this.destinatario = destinatario;
    }
}
