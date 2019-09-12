import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// services
import { MensajesService, DestinatarioService, OfertaService, AmbienteTrabajoService, AreaEntrenamientoService, PlanService } from '../../../core/services';
// MOdels
import { AmbienteTrabajo, Oferta, Lugar, Representante, Persona, AreaEntrenamiento } from "../../../core/models";
import { UtilService } from 'src/app/core/utils';

@Component({
    selector: 'area-entrenamiento-form-plan',
    templateUrl: './plan-form-area-entrenamiento.html',
    styleUrls: ['./plan-form-area-entrenamiento.css'],
})
export class PlanFormAreaEntrenamientoComponent implements OnInit {
    /**
     * @var areaEntrenamiento variable que contiene el objeto del formulario
     * @var destinatarioId identificador del destinatario
     * @var ofertaId identificador de la oferta
     * @var submitted se utiliza para identificar la validacion de errores del formulario
     * @var lugar modelo que instancia los datos de lugar
     * @var representante modelo que instancia los datos del representante
     * @var persona modelo que instancia los datos de persona
     * @var oferta modelo que instancia los datos de oferta
     * @var destinatario objeto queinstancia los datos de un destinatario
     * @var idArea identificador de area de entrenamiento
     * @var planLista listado de planes
     */
    public areaEntrenamientoForm: FormGroup;
    public destinatarioId:string;
    public ofertaId: string;
    public submitted:boolean = false;
    public lugar = new Lugar(0,0,'','','','','','','');
    public representante = new Representante(0,'','','','','','');
    public persona = new Persona(0,'','','','','',0,0,0,'','','',this.lugar,[])
    public oferta = new Oferta(0,0,'','','','','',this.lugar,'');
    public ambienteTrabajo = new AmbienteTrabajo(0,'','','','','',0,this.lugar,this.representante,'', '','','','','');
    public destinatario =  { id: 0, oficio: "", legajo: "", fecha_ingreso: "",
      origen: "", deseo_lugar_entrenamiento: "", deseo_actividad: "", fecha_presentacion: "",
      banco_cbu: "", banco_nombre: "", banco_alias: "", experiencia_laboral: 0,
      conocimientos_basicos: "", profesion: "",
      persona: this.persona};
    private idArea = 0;
    public planLista = [];

    /**
     * Constructor
     * @param _router servicio para el control de navegacion dentro del sistema
     * @param _route servicio para capturar los parametros de la url
     * @param _fb servicio para construir el formulario del plan
     * @param _formatearFecha funcion que otorga el formato de fecha.
     * @param _mensajesService servicio para la utilizacion de mensajes para el cliente
     * @param _destinatarioService servicio que otorga la conexion y funcionalidad con la api de destinatario
     * @param _ofertaService servicio que otorga la conexion y funcionalidad con la api de oferta
     * @param _ambienteTrabajoService servicio que otorga la conexion y funcionalidad con la api con ambiente de trabajo
     */
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _fb: FormBuilder,
        private _mensajesService: MensajesService,
        private _destinatarioService: DestinatarioService,
        private _ofertaService: OfertaService,
        private _ambienteTrabajoService: AmbienteTrabajoService,
        private _areaEntrenamientoService: AreaEntrenamientoService,
        private _planService: PlanService,
        private _utilService: UtilService
    ) {
        this.areaEntrenamientoForm = _fb.group({
            id: null,
            tarea: ['', [Validators.required, Validators.minLength(5)]],
            planid: ['', Validators.required],
            destinatarioid: '',
            fecha_inicial: '',
            fechaInicial: ['', Validators.required],
            descripcion_baja: '',
            ofertaid: '',
            jornada: '',
            observacion: ''
        });
    }

    ngOnInit() {
        // obtener lista
        this.obtenerPlanes();
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
    get entrenamiento() { return this.areaEntrenamientoForm.controls; }

    /**
     * @function cancelar cancela el formulario y vuelve a la vista del listado.
     */
    cancelar() {
        this._router.navigate(['area-entrenamiento']);
    }

    /**
     * @function volver cancela el formulario y vuelve a la vista de seleccion de oferta y destinatario.
     */
    volver() {
        this._router.navigate(['area-entrenamiento', 'crear-seleccion']);
    }

    /**
     * @function formatFechaInicial setea el valor de fecha inicial convirtiendolo en string
     * @param obj objeto que contiene una fecha
     */
    formatFechaInicial(obj: any) {
        this.areaEntrenamientoForm.controls.fecha_inicial.setValue(this._utilService.formatObjetoAFecha(obj));
    }

    /**
     * @function destinatarioPorId pide los datos de un destinatario por su ID
     * @param id identificador del destinatario
     */
    private destinatarioPorId(id) {
      this._destinatarioService.destinatarioPorId(id).subscribe(
        datos => {
          this.destinatario = datos;
        }, error => {
          this._mensajesService.cancelado(error, [{name:''}]);
        });
    }

    /**
     * @function ofertaPorId pide los datos de una oferta por su ID
     * @param id identificador de una oferta
     */
    private ofertaPorId(id) {
      this._ofertaService.getOfertaPorId(id).subscribe(
        datos => {
          this.ambienteTrabajoPorId(datos.ambiente_trabajoid);
          this.oferta.deserialize(datos);
          this.oferta.lugar.deserialize(datos['lugar']);
        }, error => {
          this._mensajesService.cancelado(error, [{name:''}]);
        });
    }

    private obtenerPlanes() {
      this._planService.listar().subscribe(
        datos => {
          this.planLista = datos;
        }, error => {

        }
      );
    }

    /**
     * @function ambientePorId pide los datos de un ambiente de trabajo por su ID
     * @param id identificador de ambiente de trabajo
     */
    ambienteTrabajoPorId(id) {
      this._ambienteTrabajoService.ambientePorId(id).subscribe(
        datos => {
          this.ambienteTrabajo.deserialize(datos);
          this.ambienteTrabajo.lugar.deserialize(datos['lugar']);
        }, error => {
          this._mensajesService.cancelado(error, [{name:""}]);
        }
      );
    }

    /**
     * @function guardarEntrenamiento guarda el formulario
     */
    guardarEntrenamiento() {

      const areaEntrenamiento = this.prepareAreaEntrenamineto();
      // guardo area de entrenamiento
      this._areaEntrenamientoService.guardar(areaEntrenamiento,this.idArea).subscribe(
        respuesta => {
          //console.log(respuesta);
          this._mensajesService.exitoso('Guardado exitoso',[{name:'area-entrenamiento'}]);
        },error => {
          this._mensajesService.cancelado(error, [{name:''}]);
        });

      }

    /**
     * @function prepareAreaEntrenamineto organiza los parametros establecidos para la api.
     */
    private prepareAreaEntrenamineto(): AreaEntrenamiento {
        this.areaEntrenamientoForm.controls.ofertaid.setValue(this.ofertaId);
        this.areaEntrenamientoForm.controls.destinatarioid.setValue(this.destinatarioId);
      return new AreaEntrenamiento(0,'',0,0,0,{},'','','','','','','','').deserialize(this.areaEntrenamientoForm.value);
    }
}
