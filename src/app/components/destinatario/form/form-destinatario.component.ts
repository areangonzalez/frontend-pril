import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BreadcrumbsService } from '../../breadcrumbs/breadcrumbs.service';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { switchMap } from 'rxjs/operators';
// services
import { MensajesService } from "../../../services/mensajes.service";
// models
import { Lugar } from "./../../../models/lugar.model";
import { Estudio } from "../../../models/estudio.model";
import { Persona } from "../../../models/persona.model";
import { Destinatario } from "../../../models/destinatario.model"; 
//modal
import { ModalContentEstudio, ModalEstudioComponent } from "../form/modal-estudio/modal-estudio.component";
// services
import { DestinatarioService } from "../../../services/destinatario.service";

@Component({
    selector: 'destinatario-form',
    templateUrl: './form-destinatario.html',
    styleUrls: ['./form-destinatario.css'],
    entryComponents: [ModalContentEstudio]
})
@Injectable()
export class FormDestinatarioComponent implements OnInit {
    /**
     * @var destinatarioForm variable que obtiene el formulario.
     * @var listaEstudios listado de los estudios ingresados.
     * @var idDestinatario guarda el parametro id del destinatario a editar
     * @var nroDoc guarda el numero de documento para reutilización en otros componentes
     */
    destinatarioForm: FormGroup;
    listaEstudios = [];
    idDestinatario = '';
    nroDoc: string = '';
    profesionid: number = 0;
    oficioid: number = 0;
    id: any;


    /**
     * @param _breadcrumbsService Servicio que maneja el camino de las paginas accedidas.
     * @param _router Servicio para la navegacion dentro del sistema
     * @param _route Servicio para obtener el parametro del ruteo
     * @param _fb servicio para la construccion de un formulario customizado
     * @param _mensajeService servicio para las notificaciones que se producen en las acciones de guardado
     * @param _destinatarioService Servicio que otorga la conexión con el servidor para las llamadas ajax
     */
    constructor(
        private _breadcrumbsService: BreadcrumbsService,
        private _router:Router,
        private _route: ActivatedRoute,
        private _fb: FormBuilder,
        private _mensajeService: MensajesService,
        private _destinatarioService: DestinatarioService
    ){
        this.destinatarioForm = _fb.group({
            persona: _fb.group({
                id: '',
                nro_documento: ['', [Validators.required, Validators.minLength(7)]],
                cuil: '',
                cuil_prin: ['', [Validators.required, Validators.minLength(2)]],
                cuil_ult: ['', [Validators.required, Validators.minLength(1)]],
                apellido: ['', [Validators.required, Validators.minLength(3)]],
                nombre: ['', [Validators.required, Validators.minLength(3)]],
                fechaNacimiento: ['', Validators.required],
                fecha_nacimiento: '',
                sexoid: ['', Validators.required],
                generoid: ['', Validators.required],
                estado_civilid: ['', Validators.required],
                telefono: '',
                celular: '',
                email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
                lugar: _fb.group({
                    lugarid: 0,
                    localidadid: ['', Validators.required],
                    calle: ['', [Validators.required, Validators.minLength(3)]],
                    altura: ['', Validators.required],
                    barrio: ['', [Validators.required, Validators.minLength(3)]],
                    piso: '',
                    depto: '',
                    escalera: '',
                    usarLugarEncontrado: false
                })
            }),
            destinatario: _fb.group({
                origen: ['', [Validators.required]],
                fechaPresentacion: ['', Validators.required],
                fecha_presentacion: '',
                deseo_actividad: ['', [Validators.required, Validators.minLength(3)]],
                deseo_lugar_entrenamiento: '',
                profesionid: ['', Validators.required],
                oficioid: ['', Validators.required],
                experiencia_laboral: [false, Validators.required],
                conocimientos_basicos: ['', [Validators.required, Validators.minLength(3)]],
                banco_cbu: '',
                banco_nombre: '',
                banco_alias: '',
                legajo: ['', [Validators.required]]
            })
        });
    }

    ngOnInit() {
        // breadcrumbs Dinamico
        this._breadcrumbsService.store([{ label: 'Inicio', url: 'inicio', params: [] }, { label: 'Destinatario', url: 'destinatario', params: [] }, { label: 'Agregar', url: 'destinatario/agregar', params: [] }]);
        // obtener parametro
        this.id = this._route.snapshot.paramMap.get('id');
        if (this.id != undefined) {
            this.idDestinatario = this.id;
            this.destinatarioPorId(this.id);
        }
    }
    /**
     * @function volver regresa a la vista del listado de destinatario
     */
    volver() {
        this._router.navigate(['destinatario']);
    }

    submitted = false;
    /**
     * @function onSubmit funcion que llama al preparado del guardado de un destinatario
     */
    onSubmit() {
        const params = { persona: this.prepararPersona(), destinatario: this.prepararDestinatario() };
        this.submitted = true;
        console.log(params);
        if (this.destinatarioForm.invalid) {
            this._mensajeService.cancelado('Campos sin completar.', '');
            return;
        }else{
            if (this.id){
                this.guardarDestinatario(params, this.id);
            }else{
                this.guardarDestinatario(params,0);
            }
        }
    }

    /**
     * @function guardarDestinatario guardado de destinatario
     * @param params parametros del formulario.
     * @param id identificador del destinatario para la edición
     */
    private guardarDestinatario(params:object, id:number){
        this._destinatarioService.guardar(params,id).subscribe(
            datos => {
                this._mensajeService.exitoso('guardado Exitoso.','destinatario');
        },error => {
            this._mensajeService.cancelado(error, '');
        })
    }

    /**
     * @function destinatarioPorId busca el destinatario por ID y armo el objeto para setear el formulario.
     * @param id identificador del destinatario a buscar
     */
    private destinatarioPorId(id){
        this._destinatarioService.destinatarioPorId(id).subscribe(
            datos => {
                // agrego los estudios a la lista
                (datos['persona']['estudios'].length > 0)?this.listaEstudios = datos['persona']['estudios']:[];
                // borro la propiedad estudio del objeto
                delete datos['persona']['estudios'];
                // agrego propiedades al objeto
                datos['persona']['cuil_prin'] = this.primerosDigitosCuil(datos['persona']['cuil']);
                datos['persona']['cuil_ult'] = this.ultimoDigitoCuil(datos['persona']['cuil']);
                datos['persona']['fechaNacimiento'] = this.formatFecha(datos['persona']['fecha_nacimiento']);
                datos['destinatario']['fechaPresentacion'] = this.formatFecha(datos['destinatario']['fecha_presentacion']);
                // variables para el documento, profesion y oficio
                this.nroDoc = datos['persona']['nro_documento'];
                this.profesionid = datos['destinatario']['profesionid'];
                this.oficioid = datos['destinatario']['oficioid'];
                // seteo los valores para el formulario
                this.destinatarioForm.setValue(datos);
            }, error => {
                this._mensajeService.cancelado(error,'');
            }
        );
        
    }
    /**
     * @function prepararDestinatario preparado de parametros para el objeto de destinatario
     */
    private prepararDestinatario() {
        return new Destinatario('',{},'','','',0,0,false,'','','','','').deserialize(this.destinatarioForm.value.destinatario);
    }
    /**
     * @function prepararPersona preparado de parametros para el objeto de Persona
     */
    private prepararPersona() {

        let lugar = new Lugar(0,0,'','','','','','',false).deserialize(this.destinatarioForm.value.persona.lugar);
        return new Persona(0,'','','','','',0,0,0,'','','',lugar, this.listaEstudios ).deserialize(this.destinatarioForm.value.persona);
    }
    /**
     * @function formatFecha formatea la fecha de string a un objeto para los input de fecha
     * @param fecha string de fecha
     * @return devuelve un objeto
     */
    private formatFecha(fecha:string){
        let objFecha = fecha.split('-');

        return { year: parseInt(objFecha[0]), month: parseInt(objFecha[1]), day: parseInt(objFecha[2]) };
    }
    /**
     * @function primerosDigitosCuil corta la cadena de cuil para obtener los dos primeros digitos
     * @param cuil cadena del numero de cuil
     * @return devuelve un string 
     */
    private primerosDigitosCuil(cuil:string){
        let cuil_primero = cuil.substring(0, 2);
        return cuil_primero;
    }
    /**
     * @function ultimoDigitoCuil corta la cadena de cuil para obtener el ultimo digito
     * @param cuil cadena de numero cuil
     * @return devuelve un string
     */
    private ultimoDigitoCuil(cuil:string){
        let cuil_ult = cuil.substring(10);
        return cuil_ult;
    }

    public setListaEstudios(e){
        this.listaEstudios = e;
        return this.listaEstudios;
    }

}