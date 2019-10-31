import { Component, Input, Injectable, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OfertaService, MensajesService } from 'src/app/core/services';

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
        <oferta-vista [oferta]="oferta"></oferta-vista>
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
    public oferta: any;

    constructor(
        private _ofertaService: OfertaService,
        private _mensajesService: MensajesService,
        public activeModal: NgbActiveModal
    ) {

    }

    ngOnInit(): void {
        this.ofertaPorId(this.ofertaid);
    }
    ofertaPorId(id) {
        this._ofertaService.getOfertaPorId(id).subscribe(
            response => {
                this.oferta = response
                console.log(this.oferta);
                
            }, error => {
                this._mensajesService.cancelado('Ups hubo un problema, por favor verifique los datos.', [{name: ''}])
            }
        );
    }
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
