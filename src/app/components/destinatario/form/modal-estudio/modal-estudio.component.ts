import { Component, Input, Injectable } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'modal-content-estudio',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <estudio-form></estudio-form>
    </div>
    <div class="modal-footer">
        <button class="btn btn-danger" type="button" (click)="activeModal.close('Close click')">
                Cancelar
        </button>&nbsp;
        <button class="btn btn-success" type="button">
                Agregar
        </button>
    </div>
  `
})
@Injectable()
export class ModalContentEstudio {
    //@Input() name;

    constructor(public activeModal: NgbActiveModal) { }
}
@Component({
    selector: 'modal-estudio',
    templateUrl: './modal-estudio.html'
})
@Injectable()
export class ModalEstudioComponent {
    constructor(private modalService: NgbModal) { }

    open() {
        const modalRef = this.modalService.open(ModalContentEstudio, {size: 'lg'});
        //modalRef.componentInstance.name = 'World';
    }
}