import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from "../../../breadcrumbs/breadcrumbs.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormatObjetoAFecha } from "../../../../shareds/fechas";
// services
import { MensajesService } from '../../../../services/mensajes.service';
import { DestinatarioService } from '../../../../services/destinatario.service';
import { OfertaService } from "../../../../services/oferta.service";
import { AmbienteTrabajoService } from "../../../../services/ambiente-trabajo.service";

@Component({
    selector: 'area-entrenamiento-form-plan',
    templateUrl: './plan-form-area-entrenamiento.html',
    styleUrls: ['./plan-form-area-entrenamiento.css'],
    providers: [FormatObjetoAFecha]
})
export class PlanFormAreaEntrenamientoComponent implements OnInit {
    /**
     * @var areaEntrenamiento variable que contiene el objeto del formulario
     */
    public areaEntrenamiento: FormGroup;
    public destinatarioId:string;
    public ofertaId: string;
    public submitted:boolean = false;
    public destinatario = { id: 0, oficio: "", legajo: "", fecha_ingreso: "",
      origen: "", deseo_lugar_entrenamiento: "", deseo_actividad: "", fecha_presentacion: "",
      banco_cbu: "", banco_nombre: "", banco_alias: "", experiencia_laboral: 0,
      conocimientos_basicos: "", profesion: "",
      persona: { nombre: "", apellido: "", nro_documento: "",
        cuil: "", telefono: "", celular: "", email: "", fecha_nacimiento: "",
        sexo: "", genero: "", estado_civil: "",
        estudios: [{ nivel_educativoid: 0, nivel_educativo: "", titulo: "",
          completo: 0, en_curso: 0, anio: "" }],
        lugar: { calle: "", altura: "", barrio: "", piso: "", depto: "",
          escalera: "", localidad: "Viedma" }}};
    public oferta = { id: 0, ambienteid: "", nombre_sucursal: "",
      puesto: "", area: "", demanda_laboral: "", objetivo: "",
      dia_horario: "", tarea: "", fecha_inicial: "",
      lugar: { id: 0, localidadid: "", calle: "", altura: "",
        barrio: "", piso: "", depto: "", escalera: "", localidad: ""
      }};
      public ambienteTrabajo = {};

    /**
     * Constructor
     * @param breadcrumbsService servicio para el manejo de las paginas accedidas
     * @param _router servicio para el control de navegacion dentro del sistema
     * @param _formatearFecha: funcion que otorga el formato de fecha.
     */
    constructor(
        private _breadcrumbsService: BreadcrumbsService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _fb: FormBuilder,
        private _formatearFecha: FormatObjetoAFecha,
        private _mensajesService: MensajesService,
        private _destinatarioService: DestinatarioService,
        private _ofertaService: OfertaService,
        private _ambienteTrabajoService: AmbienteTrabajoService
    ) {
        this.areaEntrenamiento = _fb.group({
            id: '',
            tarea: ['', [Validators.required, Validators.minLength(5)]],
            planid: ['', Validators.required],
            destinatarioid: '',
            fecha_inicial: '',
            fechaInicial: ['', Validators.required],
            descripcion_baja: '',
            ofertaid: ''
        });
    }

    ngOnInit() {
        this._breadcrumbsService.store([
            { label: 'Inicio', url: 'inicio', params: [] },
            { label: 'Área de entrenamiento', url: 'area-entrenamiento', params: [] },
            { label: 'Crear', url: 'area/crear-plan', params: [] }]);
        // obtener parametros
        this.destinatarioId = this._route.snapshot.paramMap.get('destinatarioid');
        this.ofertaId = this._route.snapshot.paramMap.get('ofertaid');

        if (this.destinatarioId != undefined && this.ofertaId != undefined) {
          this.destinatarioPorId(this.destinatarioId);
          this.ofertaPorId(this.ofertaId);
        }else{
          this._router.navigate(['/']);
        }

    }

    /**
     * @function entrenamiento se utiliza para controlar el objeto del formulario entrenamiento
     */
    get entrenamiento() { return this.areaEntrenamiento.controls; }

    cancelar() {
        this._router.navigate(['area']);
    }

    volver() {
        this._router.navigate(['area', 'crear-seleccion']);
    }

    formatFechaInicial(obj: any) {
        this.areaEntrenamiento.controls.fecha_inicial.setValue(this._formatearFecha.onChange(obj));
    }

    destinatarioPorId(id) {
      this._destinatarioService.destinatarioPorId(id).subscribe(
        datos => {
          this.destinatario = datos;
        }, error => {
          this._mensajesService.cancelado(error, [{name:''}]);
        });
    }
    ofertaPorId(id) {
      this._ofertaService.getOfertaPorId(id).subscribe(
        datos => {
          this.ambienteTrabajoPorId(datos.ambienteid);
          for (const key in datos) {
              this.oferta[key] = datos[key];
          }
        }, error => {
          this._mensajesService.cancelado(error, [{name:''}]);
        });
    }

    ambienteTrabajoPorId(id) {
      this._ambienteTrabajoService.ambientePorId(id).subscribe(
        datos => {
          console.log(datos);
          this.ambienteTrabajo = datos;
        }, error => {
          this._mensajesService.cancelado(error, [{name:""}]);
        }
      );
      console.log("ambiente trabajo");
    }
}
