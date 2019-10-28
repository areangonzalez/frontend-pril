import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// services
import { MensajesService, DestinatarioService, OfertaService, AmbienteTrabajoService, AreaEntrenamientoService, PlanService } from '../../core/services';
// MOdels
import { AmbienteTrabajo, Oferta, Lugar, Representante, Persona, AreaEntrenamiento } from "../../core/models";
import { UtilService } from 'src/app/core/utils';

@Component({
    selector: 'area-entrenamiento-form-plan',
    templateUrl: './plan-form-area-entrenamiento.html',
    styleUrls: ['./plan-form-area-entrenamiento.css'],
    providers:[UtilService]
})
export class PlanFormAreaEntrenamientoComponent implements OnInit {

  public areaEntrenamientoForm: FormGroup; /** @var areaEntrenamiento variable que contiene el objeto del formulario */
  public destinatarioId:string; /** @var destinatarioId identificador del destinatario */
  public ofertaId: string; /** @var ofertaId identificador de la oferta */
  public submitted:boolean = false; /** @var submitted se utiliza para identificar la validacion de errores del formulario */
  public planLista:any[] = []; /** @var planLista listado de planes */
  public destinatario: any;
  public oferta: any;
  public ambienteTrabajo: any;

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
    private _ambienteTrabajoService: AmbienteTrabajoService,
    private _areaEntrenamientoService: AreaEntrenamientoService,
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
    this.planLista = this._route.snapshot.data['planes'];
    this.destinatario = this._route.snapshot.data['destinatario'];
    this.oferta = this._route.snapshot.data['oferta'];

    // obtener parametros
    this.destinatarioId = this._route.snapshot.paramMap.get('destinatarioid');
    this.ofertaId = this._route.snapshot.paramMap.get('ofertaid');

    if (this.destinatarioId != undefined && this.ofertaId != undefined) {
      this.ambienteTrabajoPorId(this.oferta.ambiente_trabajoid);
    }else{
      this._router.navigate(['/']);
    }

  }


  /**
   * @function cancelar cancela el formulario y vuelve a la vista del listado.
   */
  cancelar() {
      this._router.navigate(['inicio','area-entrenamiento']);
  }

  /**
   * @function volver cancela el formulario y vuelve a la vista de seleccion de oferta y destinatario.
   */
  volver() {
      this._router.navigate(['inicio','area-entrenamiento', 'crear-seleccion']);
  }

  /**
   * @function formatFechaInicial setea el valor de fecha inicial convirtiendolo en string
   * @param obj objeto que contiene una fecha
   */
  formatFechaInicial(obj: any) {
      this.areaEntrenamientoForm.controls['fecha_inicial'].setValue(this._utilService.formatObjetoAFecha(obj));
  }

  /**
   * @function ambientePorId pide los datos de un ambiente de trabajo por su ID
   * @param id identificador de ambiente de trabajo
   */
  ambienteTrabajoPorId(id:number) {
    this._ambienteTrabajoService.ambientePorId(id).subscribe(
      datos => {
        this.ambienteTrabajo  = datos
        /* this.ambienteTrabajo.lugar.deserialize(datos['lugar']); */
      }, error => {
        this._mensajesService.cancelado(error, [{name:""}]);
      }
    );
  }

  /**
   * @function guardarEntrenamiento guarda el formulario
   */
  guardarEntrenamiento(datos:any) {

    // guardo area de entrenamiento
    this._areaEntrenamientoService.guardar(datos, 0).subscribe(
      respuesta => {
        //console.log(respuesta);
        this._mensajesService.exitoso('Guardado exitoso',[{name:'area-entrenamiento'}]);
      },error => {
        this._mensajesService.cancelado(error, [{name:''}]);
      });

  }
  /**
   * Valida los campos del formulario
   */
  validarForm(){
    if (!this.areaEntrenamientoForm.invalid) {
      this.areaEntrenamientoForm.controls['destinatarioid'].patchValue(this.destinatarioId);
      this.areaEntrenamientoForm.controls['ofertaid'].patchValue(this.ofertaId);
      const areaEntrenamiento:any = this.areaEntrenamientoForm.value;

      console.log(areaEntrenamiento);

      //this.guardarEntrenamiento(areaEntrenamiento);
    }else{
      this._mensajesService.cancelado('Campos sin completar.', [{ name: '' }]);
      return ;
    }
  }
}
