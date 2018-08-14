import { Component, Input, Injectable, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";


@Component({
    selector: 'modal-content-estudio',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <estudio-form [submitted]="submitted" [errorNivelEducativo]="errorNivelEducativo" [group]="estudiosForm" [datosEstudio]="estudio"></estudio-form>
    </div>
    <div class="modal-footer">
        <button class="btn btn-danger" type="button" (click)="activeModal.close('close')">
                Cancelar
        </button>&nbsp;
        <button class="btn btn-success" type="button" (click)="agregarEstudio()">
                Agregar
        </button>
    </div>
  `
})
@Injectable()
export class ModalContentEstudio {
    @Input('listaEstudios') listaEstudios;
    @Input('estudio') estudio;
    @Input('tipo') tipo;
    @Input('id') id;

    submitted = false;
    errorNivelEducativo = false;
    estudiosForm: FormGroup;

    constructor(public activeModal: NgbActiveModal, _fb: FormBuilder ) {
        this.estudiosForm = _fb.group({
            nivel_educativoid: ['', Validators.required],
            nivel_educativo_nombre: '',
            completo: true,
            en_curso: false,
            titulo: ['', [Validators.required, Validators.minLength(3)]]
        });
     }

    agregarEstudio(){
        let j=0;
        this.submitted = true;
        if(this.estudiosForm.invalid) {
            return;
        }else{
            // verifico que no sea el primer elemento
            if (this.listaEstudios.length > 0) {
                if (this.tipo == 'editar') {
                    this.listaEstudios.splice(this.id,1);
                    if (!this.validarNivelEducativo(this.estudiosForm.value.nivel_educativoid)) {
                        this.errorNivelEducativo = false;
                        this.activeModal.close(this.estudiosForm.value);
                    } else {// si existe coincidencia aviso al usuario con un error 
                        this.errorNivelEducativo = true;
                        return;
                    }
                }else{
                    // valido nivel educativo
                    if (!this.validarNivelEducativo(this.estudiosForm.value.nivel_educativoid)) {
                        this.errorNivelEducativo = false;
                        this.activeModal.close(this.estudiosForm.value);    
                    }else{// si existe coincidencia aviso al usuario con un error 
                        this.errorNivelEducativo = true;
                        return;
                    }
                }

            }else{// mando el objeto si es el primer elemento a agregar
                this.activeModal.close(this.estudiosForm.value);
            }
        }
    }


    validarNivelEducativo(nivelEducativo){
        // busco en el listado el nivel educativo por ID
        for (var i = 0; i < this.listaEstudios.length; i++) {
            if (this.listaEstudios[i].nivel_educativoid == nivelEducativo) {
                return true;
            }
        }
        return false;
    }
}
@Component({
    selector: 'modal-estudio',
    templateUrl: './modal-estudio.html'
})
@Injectable()
export class ModalEstudioComponent {
    /**
     * @var listaEstudios listado de los estudios de un destinatario.
     * @var texto variable para cambiar el nombre del boton
     * @var tipo variable que personaliza el icono del boton por ejemplo agregar, editar, borrar.
     */
    @Input("listaEstudios") listaEstudios;
    @Input("texto") texto;
    @Input("tipo") tipo;
    @Input("estudio") estudio;
    @Input("id") id;

    constructor(private modalService: NgbModal) { }

    open() {
        const modalRef = this.modalService.open(ModalContentEstudio, {size: 'lg'});
        modalRef.componentInstance.listaEstudios = this.listaEstudios;
        modalRef.componentInstance.estudio = this.estudio;
        modalRef.componentInstance.tipo = this.tipo;
        modalRef.componentInstance.id = this.id;
        modalRef.result.then(
            (result) => {
                if (result == 'close'){
                }else{
                    return this.listaEstudios.push(result);
                }
            }, (reason) => {
                if (reason === ModalDismissReasons.ESC) {
                    
                }
            }
        );
    }
    
}
