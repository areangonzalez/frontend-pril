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
      <estudio-form [submitted]="submitted" [errorNivelEducativo]="errorNivelEducativo" [group]="estudiosForm"></estudio-form>
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
            if (this.listaEstudios.length > 0) {
                for (var i = 0; i < this.listaEstudios.length; i++) {
                    if (this.listaEstudios[i].nivel_educativoid == this.estudiosForm.value.nivel_educativoid) {
                        j++;
                    }                    
                }
                if (j == 0) {
                    this.errorNivelEducativo = false;
                    this.activeModal.close(this.estudiosForm.value);    
                }else{
                    this.errorNivelEducativo = true;
                    return;
                }
            }else{
                this.activeModal.close(this.estudiosForm.value);
            }
        }
    }
}
@Component({
    selector: 'modal-estudio',
    templateUrl: './modal-estudio.html'
})
@Injectable()
export class ModalEstudioComponent {
    @Input("listaEstudios") listaEstudios;
    constructor(private modalService: NgbModal) { }

    open() {
        const modalRef = this.modalService.open(ModalContentEstudio, {size: 'lg'});
        modalRef.componentInstance.listaEstudios = this.listaEstudios;
        modalRef.result.then(
            (result) => {
                console.log(result);
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