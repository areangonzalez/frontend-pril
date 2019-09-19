import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl } from "@angular/forms";
import { switchMap } from 'rxjs/operators';
// services
import { MensajesService, DestinatarioService } from "../../core/services";
// models
import { Lugar, Persona, Destinatario } from "../../core/models";

@Component({
    selector: 'destinatario-form',
    templateUrl: './form-destinatario.html',
    styleUrls: ['./form-destinatario.css']
})
@Injectable()
export class FormDestinatarioComponent implements OnInit {
    public destinatarioForm: FormGroup; // variable que obtiene el formulario.
    public listaEstudios = []; // listado de los estudios ingresados.
    public listaOficios = [];
    private idDestinatario = ''; // guarda el parametro id del destinatario a editar
    public nroDoc: string = ''; // guarda el numero de documento para reutilización en otros componentes
    public profesionid: number = 0; // id de profesion
    public id: any; // identificador del destinatario
    public mostrarBoton: boolean = true; // muestra el boton de la busqueda por documento
    public sexoLista: any; // lista para la seleccion de sexo
    public generoLista: any; // lista para la seleccion de genero
    public estadoCivilLista: any; // lista para la seleccion de estado civil
    public oficioLista: any; // lista para la seleccion de oficio


    /**
     * @param _router Servicio para la navegacion dentro del sistema
     * @param _route Servicio para obtener el parametro del ruteo
     * @param _fb servicio para la construccion de un formulario customizado
     * @param _mensajeService servicio para las notificaciones que se producen en las acciones de guardado
     * @param _destinatarioService Servicio que otorga la conexión con el servidor para las llamadas ajax
     */
    constructor(
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
                email: ['', [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
                profesionid: null,
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
            }),
            destinatario: _fb.group({
                id: null,
                origen: ['', [Validators.required]],
                fechaPresentacion: ['', Validators.required],
                fecha_presentacion: '',
                deseo_actividad: ['', [Validators.required, Validators.minLength(3)]],
                deseo_lugar_entrenamiento: '',
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
      this.sexoLista = this._route.snapshot.data['sexo'];
      this.generoLista = this._route.snapshot.data['genero'];
      this.estadoCivilLista = this._route.snapshot.data['estadoCivil'];
      this.oficioLista = this._route.snapshot.data['oficio'];
      //this.getListaOficios();
        // obtener parametro
        this.id = this._route.snapshot.paramMap.get('id');
        if (this.id != undefined) {
            this.idDestinatario = this.id;
            this.destinatarioPorId(this.id);
            this.mostrarBoton = false;
        }
    }
    /**
     * Obtengo el listad de oficios del componente de tags.
     * @param oficios listado de oficios
     */
    getListaOficios(oficios:any){
      this.listaOficios = oficios;
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
        const params = { destinatario: this.prepararDestinatario() };
        params.destinatario.persona['lista_oficio'] = this.listaOficios;
        this.submitted = true;

        console.log(params);
        if (this.destinatarioForm.invalid) {
            this._mensajeService.cancelado('Campos sin completar.', [{ name: '' }]);
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
                this._mensajeService.exitoso('guardado Exitoso.', [{ name: 'destinatario' }]);
        },error => {
            this._mensajeService.cancelado(error, [{ name: '' }]);
        })
    }

    /**
     * @function destinatarioPorId busca el destinatario por ID y armo el objeto para setear el formulario.
     * @param id identificador del destinatario a buscar
     */
    private destinatarioPorId(id){
        this._destinatarioService.destinatarioPorId(id)
        .map(vPersona => {
            let vDatos = {destinatario:{}, persona:{}};
            // agrego los estudios a la lista
            this.listaEstudios = (vPersona.persona.estudios.length > 0) ? vPersona.persona.estudios : [];
            this.listaOficios = (vPersona.persona.lista_oficio.length > 0) ? vPersona.persona.lista_oficio : [];
            vPersona.persona.fechaNacimiento = this.formatFecha(vPersona.persona.fecha_nacimiento);
            vPersona.fechaPresentacion = this.formatFecha(vPersona.fecha_presentacion);
            vPersona.persona.cuil_prin = this.primerosDigitosCuil(vPersona.persona.cuil);
            vPersona.persona.cuil_ult = this.ultimoDigitoCuil(vPersona.persona.cuil);

            vDatos.persona = vPersona.persona;
            delete(vPersona.persona);
            vDatos.destinatario = vPersona;
            return vDatos;
        })
        .subscribe(
            datos => {
                // variables para el documento, profesion y oficio
                this.nroDoc = datos['persona']['nro_documento'];
                this.profesionid = datos['destinatario']['profesionid'];
                //this.oficioid = datos['destinatario']['oficioid'];
                // seteo los valores del objeto
                this.destinatarioForm.patchValue(datos);
            }, error => {
                this._mensajeService.cancelado(error, [{ name: '' }]);
            }
        );

    }
    /**
     * @function prepararDestinatario preparado de parametros para el objeto de destinatario
     */
    private prepararDestinatario() {
        return new Destinatario('',{},'','','',0,0,false,'','','','','',this.prepararPersona()).deserialize(this.destinatarioForm.value.destinatario);
    }
    /**
     * @function prepararPersona preparado de parametros para el objeto de Persona
     */
    private prepararPersona() {

        let lugar = new Lugar(0,0,'','','','','','','').deserialize(this.destinatarioForm.value.persona.lugar);
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
    /**
     * Obtengo el listado de estudios del componente de datos persona
     * @param estudios listado de estudios
     */
    public setListaEstudios(estudios){
        this.listaEstudios = estudios;
        return this.listaEstudios;
    }
    /**
     * Obtengo el listado de oficios del componente datos persona
     * @param oficios listado de oficios
     */
    public setListaOficios(oficios){
      this.listaOficios = oficios;
      return this.listaOficios;
    }
}
