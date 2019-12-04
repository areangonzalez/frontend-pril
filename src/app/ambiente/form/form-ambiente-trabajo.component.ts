import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// services
import { MensajesService } from "../../core/services/mensajes.service";
import { AmbienteTrabajoService } from "../../core/services/ambiente-trabajo.service";

@Component({
    selector: 'destinatario-form',
    templateUrl: './form-ambiente-trabajo.html',
    styleUrls: ['./form-ambiente-trabajo.css'],
})
@Injectable()
export class FormAmbienteTrabajoComponent implements OnInit {
    /**
     * @var ambienteForm contiene el array del formulario
     * @var mostrarBtnBusqueda muestra el boton de busqueda por numero documento
     * @var submitted muestra los errores en el formulario
     * @var id identificador del ambiente de trabajo privado
     * @var idAmbiente identificador del ambiente de trabajo publico
     */
    public ambienteForm: FormGroup;
    public mostrarBtnBusqueda: boolean = true;
    public submitted: boolean = false;
    private id: any;
    public idAmbiente = '';
    public tipo_ambiente_trabajo_lista //lista de de tipos de ambientes de trabajo
    /**
     * Inicializa los servicios
     * @param _router manejo de rutas dentro del componente
     * @param _route Servicio para obtener el parametro del ruteo
     * @param _fb formBuilder servicio para crear el formulario
     * @param _mensajeService servicio que maneja los mensajes.
     * @param _ambienteTrabajoService maneja el guarado y editado del formulario
     */
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _fb: FormBuilder,
        private _mensajeService: MensajesService,
        private _ambienteTrabajoService: AmbienteTrabajoService
    ) {
       this.ambienteForm = _fb.group({
            persona: _fb.group({
                id: 0,
                nro_documento: ['', [Validators.required, Validators.minLength(7)]],
                apellido: ['', [Validators.required, Validators.minLength(3)]],
                nombre: ['', [Validators.required, Validators.minLength(3)]],
                telefono: '',
                celular: '',
                email: ['', [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
              }),
              ambiente: _fb.group({
                id: 0,
                nombre: ['', [Validators.required, Validators.minLength(3)]],
                legajo: ['', Validators.required],
                observacion: '',
                cuit: ['', [Validators.required, Validators.minLength(3)]],
                actividad: ['', [Validators.required, Validators.minLength(5)]],
                tipo_ambiente_trabajoid: ['', Validators.required],
                telefono1: '',
                telefono2: '',
                telefono3: '',
                fax: '',
                email: ['', [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
                lugar: _fb.group({
                    id: 0,
                    localidadid: ['', Validators.required],
                    calle: ['', [Validators.required, Validators.minLength(3)]],
                    altura: ['', Validators.required],
                    barrio: '',
                    piso: '',
                    depto: '',
                    escalera: ''
                })
            })
        });
    }

    ngOnInit() {
        // breadcrumbs Dinamico
        this.id = this._route.snapshot.paramMap.get('ambienteid');
        this.tipo_ambiente_trabajo_lista = this._route.snapshot.data['tipoAmbienteTrabajoLista'];
        
        if (this.id != undefined) {
            this.idAmbiente = this.id;
            this.ambientePorId(this.id);
        }
    }
    /**
     * @function volver Vuelve a la vista del listado de ambiente de trabajo
     */
    volver() {
        this._router.navigate(['inicio','ambiente']);
    }

    prepararAmbiente() {
        const params = this.ambienteForm.get('ambiente').value;
        params['persona'] = this.ambienteForm.get('persona').value;

        this.submitted = true;
        if (this.ambienteForm.invalid) {
            this._mensajeService.cancelado('Campos sin completar.', [{ name: '' }]);
            return;
        }else{            
            if (this.id) {
                this.guardarAmbiente(params, this.id);
            }else{
                this.guardarAmbiente(params, 0);
            }
        }
    }

    private guardarAmbiente(params, id) {
        this._ambienteTrabajoService.guardar(params, id).subscribe(
            datos => {
                if (id == '') {
                    id = datos['data']['id'];
                }
                console.log("id al editar un AT: ",id);
                this._mensajeService.ofrecer('Se ha guardado correctamente el ambiente de trabajo.', [{ name: 'ambiente/' + id + '/ofertas', tipo: 'agregar' }, { name: 'inicio/ambiente/vista/' + id, tipo: 'vista' }]);
            }, error => {
                this._mensajeService.cancelado(error, [{ name: '' }]);
            }
        );
    }

    private ambientePorId(id) {
        this._ambienteTrabajoService.ambientePorId(id)
        .map(vAmbiente => {
          let vDatos = {persona: {}, ambiente: {} };
          // agrego persona dentro del objeto
          vDatos.persona = vAmbiente['persona'];
          // elimino persona del objeto
          delete(vAmbiente['persona']);
          // agrego ambiente al objeto
          vDatos.ambiente = vAmbiente;

          return vDatos;
        })
        .subscribe(
            datos => {
              this.ambienteForm.patchValue(datos);
                //this.ambienteForm.setValue(datos);
            }, error => {
                this._mensajeService.cancelado(error, [{ name: '' }]);
            }
        );
    }

}
