import { Component, Input, Injectable, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


/**
 * Contennido que contiene un modal
 */
@Component({
    selector: 'content-detalle-destinatario-modal',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Detalle del Destinatario: <span class="text-muted">{{destinatario.persona.apellido}}, {{destinatario.persona.nombre}}</span></h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <datos-destinatario-vista [destinatario]="destinatario"></datos-destinatario-vista>
    </div>
    <div class="modal-footer">
        <button class="btn btn-danger" type="button" (click)="activeModal.close('close')">
                Cerrar
        </button>
    </div>
  `
})
@Injectable()
export class DetalleDestinatarioContentComponent {
    @Input("destinatario") destinatario:any;

    constructor(public activeModal: NgbActiveModal) {}
}

/**
 * Componente del boton para abrir el modal, y configuraciones.
 */
@Component({
    selector: 'button-detalle-destinatario-modal',
    template: `
    <button type="button" class="btn btn-link btn-sm float-right" (click)="open()" ngbTooltip="Ver mas detalle del destinatario" placement="left" ><i class="far fa-eye"></i> Ver mas...</button>
    `
})
@Injectable()
export class DetalleDestinatarioModalComponent {
  @Input("destinatario") destinatario:any;

  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(DetalleDestinatarioContentComponent, { size: 'lg' });
    modalRef.componentInstance.destinatario = this.destinatario;
  }
}
