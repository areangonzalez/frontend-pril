import { Component, Input, Injectable, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Oferta } from "../../../../models/oferta.model";
import { Lugar } from "../../../../models/lugar.model";
import { MensajesService } from "../../../../services/mensajes.service";

@Component({
    selector: 'modal-content-oferta',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Localización de la práctica en el puesto de trabajo</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <form [formGroup]="ofertaForm">
            <form-oferta [group]="ofertaForm" [submitted]="submitted"></form-oferta>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn btn-danger" type="button" (click)="activeModal.close('close')">
                Cancelar
        </button>&nbsp;
        <button class="btn btn-success" type="button" (click)="guardarOferta()">
                Agregar
        </button>
    </div>
  `
})
@Injectable()
export class ModalContentOferta {
    @Input('ambienteid') public ambienteid: number;
    /* @Input('estudio') estudio;
    @Input('tipo') tipo;
    @Input('id') id;

    
    errorNivelEducativo = false;
    */
    public ofertaForm: FormGroup;
    public submitted = false;

     constructor(
         public activeModal: NgbActiveModal, 
         private _fb: FormBuilder, 
         private _mensajeService: MensajesService
        ) {
         this.ofertaForm = _fb.group({
             id: 0,
             ambienteid: 0,
             nombre_sucursal: ['', [Validators.required, Validators.minLength(3)]],
             puesto: ['', [Validators.required, Validators.minLength(3)]],
             area: ['', [Validators.required, Validators.minLength(3)]],
             demanda_laboral: ['', [Validators.required, Validators.minLength(8)]],
             objetivo: '',
             dia_horario: ['', [Validators.required, Validators.minLength(5)]],
             tarea: ['', [Validators.required, Validators.minLength(8)]],
             lugar: _fb.group({
                 id: 0,
                 localidadid: ['', Validators.required],
                 calle: ['', [Validators.required, Validators.minLength(3)]],
                 altura: ['', Validators.required],
                 barrio: ['', [Validators.required, Validators.minLength(3)]],
                 piso: '',
                 depto: '',
                 escalera: ''
             })
         }); 
    }

    guardarOferta() {
        this.ofertaForm.controls.ambienteid.setValue(this.ambienteid);
        let lugar = new Lugar(0, 0, '', '', '', '', '', '').deserialize(this.ofertaForm.value.lugar.value);
        let oferta = new Oferta(0,0,'','','','','','','', lugar).deserialize(this.ofertaForm.value);

        this.submitted = true;
        console.log(this.ofertaForm.invalid);
        if (this.ofertaForm.invalid) {
            this._mensajeService.cancelado('Campos sin completar.', [{ name: '' }]);
            return;
        } else {
                this.activeModal.close({params: oferta, id:oferta.id});
        }


        /*  */
        
    }
 
    /*
    validarNivelEducativo(nivelEducativo) {
        // busco en el listado el nivel educativo por ID
        for (var i = 0; i < this.listaOfertas.length; i++) {
            if (this.listaOfertas[i].nivel_educativoid == nivelEducativo) {
                return true;
            }
        }
        return false;
    } */
}
@Component({
    selector: 'modal-oferta',
    templateUrl: './modal-oferta.html'
})
@Injectable()
export class ModalOfertaComponent {
    /**
     * @var listaOfertas listado de los estudios de un destinatario.
     * @var texto variable para cambiar el nombre del boton
     * @var tipo variable que personaliza el icono del boton por ejemplo agregar, editar, borrar.
     */
    @Input("texto") texto;
    @Input("tipo") tipo;
    @Input("ambienteid") ambienteid:number;
    @Output("guardarOferta") guardarOferta = new EventEmitter();
    /*@Input("estudio") estudio;
    @Input("id") id; */

    constructor(private modalService: NgbModal) { }

    open() {
        const modalRef = this.modalService.open(ModalContentOferta, { size: 'lg' });
        modalRef.componentInstance.ambienteid = this.ambienteid;
        /* modalRef.componentInstance.estudio = this.estudio;
        modalRef.componentInstance.tipo = this.tipo;
        modalRef.componentInstance.id = this.id; */
        modalRef.result.then(
            (result) => {
                if (result == 'close') {
                } else {
                    return this.guardarOferta.emit(result);
                }
            }, (reason) => {
                if (reason === ModalDismissReasons.ESC) {

                }
            }
        ); 
    }

}
