import { Component, Input, Injectable, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


/**
 * Contennido que contiene un modal
 */
@Component({
    selector: 'content-detalle-ambiente-trabajo-modal',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Detalle del Ambiente de Trabajo: <span class="text-muted">{{ambienteTrabajo.nombre}}</span></h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <datos-ambiente-trabajo-vista [ambiente]='ambienteTrabajo'></datos-ambiente-trabajo-vista>
    </div>
    <div class="modal-footer">
        <button class="btn btn-danger" type="button" (click)="activeModal.close('close')">
                Cerrar
        </button>
    </div>
  `
})
@Injectable()
export class DetalleAmbienteTrabajoContentComponent {
    @Input("ambienteTrabajo") ambienteTrabajo:any;

    constructor(public activeModal: NgbActiveModal) {}
}

/**
 * Componente del boton para abrir el modal, y configuraciones.
 */
@Component({
    selector: 'mostrar-detalle-ambiente-trabajo-modal',
    template: `
    <span class="btn-link" ngbTooltip="Mostrar datos ambiente de trabajo" placement="top" (click)="open()" >({{nombreSucursal}})</span>
    `,
    styles:['span.btn-link:hover { cursor:pointer }']
})
@Injectable()
export class DetalleAmbienteTrabajoModalComponent {
  @Input("ambienteTrabajo") ambienteTrabajo:any;
  @Input("nombreSucursal") nombreSucursal: string;

  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(DetalleAmbienteTrabajoContentComponent, { size: 'lg' });
    modalRef.componentInstance.ambienteTrabajo = this.ambienteTrabajo;
  }
}
