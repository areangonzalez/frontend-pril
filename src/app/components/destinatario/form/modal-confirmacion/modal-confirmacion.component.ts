import { Component, Input, Injectable, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'modal-content-confirmacion',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <p>¿Está seguro que desea borrar este estudio?</p>
    </div>
    <div class="modal-footer">
        <button class="btn btn-danger" type="button" (click)="activeModal.close('close')">
                No
        </button>&nbsp;
        <button class="btn btn-success" type="button" (click)="borrarEstudio()">
                Si
        </button>
    </div>
  `
})
@Injectable()
export class ModalContentConfirmacion {
    @Input("listaEstudios") listaEstudios;
    @Input("id") id;

    constructor(public activeModal: NgbActiveModal) {}

    borrarEstudio(){
        this.listaEstudios.splice(this.id, 1);
        this.activeModal.close('close');
    }

}
@Component({
    selector: 'modal-confirmacion',
    templateUrl: './modal-confirmacion.html'
})
@Injectable()
export class ModalConfirmacionComponent {
    @Input("id") id;
    @Input("listaEstudios") listaEstudios;

    constructor(private modalService: NgbModal) { }

    open() {
        const modalRef = this.modalService.open(ModalContentConfirmacion, { size: 'lg' });
        modalRef.componentInstance.id = this.id;
        modalRef.componentInstance.listaEstudios = this.listaEstudios;
    }

}
