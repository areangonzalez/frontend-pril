import { Component, Input, Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MensajesService } from '../../core/services';

@Component({
    selector: 'modal-content-abm-borrar',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Borrar {{nombreAbm}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('closed')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <h5 class="d-flex justify-content-center">¿Está seguro que desea borrar este {{nombreAbm}}?</h5>
    </div>
    <div class="modal-footer">
      <button class="btn btn-danger" type="button" (click)="activeModal.close('closed')">No</button>&nbsp;
      <button class="btn btn-success" type="button" (click)="borrar()">Si</button>
    </div>
    `
})
@Injectable()
export class ModalContentAbmBorrar implements OnInit {
    @Input("nombreAbm") public nombreAbm: string; // nombre del abm Ej.; 'Oficio'

    constructor(
        private _mensajesService: MensajesService,
        public activeModal: NgbActiveModal
    ) {

    }

    ngOnInit(): void {
    }

    borrar(){
      this.activeModal.close(true);
    }

}

@Component({
    selector: 'abm-borrar-modal',
    templateUrl: './abm-borrar-modal.component.html'
})
@Injectable()
export class AbmBorrarModalComponent {
  @Input("nombreAbm") public nombreAbm: string;
  @Input("importarId") public importarId: any;
  @Output("obtenerConfirmacion") public obtenerConfirmacion = new EventEmitter();


  constructor(private modalService: NgbModal) { }

  open() {
      const modalRef = this.modalService.open(ModalContentAbmBorrar);
      modalRef.componentInstance.nombreAbm = this.nombreAbm;
      modalRef.result.then(
        (result) => {
          if (result == 'closed') {
            this.obtenerConfirmacion.emit(false);
          }else{
            this.obtenerConfirmacion.emit(this.importarId);
          }
        }
      )
  }
}
