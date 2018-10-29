import { Component, Input, Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Oferta } from "../../../../models/oferta.model";
import { Lugar } from "../../../../models/lugar.model";
import { MensajesService } from "../../../../services/mensajes.service";
import { OfertaService } from "../../../../services/oferta.service";

@Component({
    selector: 'modal-content-oferta',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Vista de la oferta</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <oferta-vista [ofertaid]="ofertaid"></oferta-vista>
    </div>
    <div class="modal-footer">
        <button class="btn btn-danger" type="button" (click)="activeModal.close('close')">
                Cerrar
        </button>&nbsp;
    </div>
  `
})
@Injectable()
export class ModalContentOfertaVista implements OnInit {
    /**
     * @var ofertaid id de la oferta
     * @var oferta objeto que contiene los datos de la oferta
     */
    @Input('ofertaid') public ofertaid: number;
    public oferta: object;

    constructor(
        public activeModal: NgbActiveModal,
        private _mensajeService: MensajesService,
        private _ofertaService: OfertaService,
    ) {
        
    }

    ngOnInit(): void {}
}
@Component({
    selector: 'modal-vista-oferta',
    templateUrl: './modal-vista-oferta.html'
})
@Injectable()
export class ModalVistaOfertaComponent {
    /**
     * @var ofertaid id de la oferta.
     */
    @Input("ofertaid") ofertaid: number;


    constructor(private modalService: NgbModal) { }

    open() {
        const modalRef = this.modalService.open(ModalContentOfertaVista, { size: 'lg' });
        modalRef.componentInstance.ofertaid = this.ofertaid;
    }
}