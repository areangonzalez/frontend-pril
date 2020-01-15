import { Component, Input, Injectable, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MensajesService } from 'src/app/core/services';

@Component({
    selector: 'modal-content-oferta',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">{{titulo}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <div class="card">
            <div class="card-body">
                <abm-form [armarForm]="armarForm"></abm-form>

            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn btn-danger" type="button" (click)="activeModal.close('close')">
                Cerrar
        </button>&nbsp;
    </div>
  `
})
@Injectable()
export class ModalContentAbmAgregar implements OnInit {
    /**
     * @var tipo tipo de formulario
     */
    @Input('titulo') public titulo: string;
    @Input('tipo') public tipo: string;
    @Input('datos') public datos: string;
    @Input('aermarForm') public armarForm: string;

    constructor(
        private _mensajesService: MensajesService,
        public activeModal: NgbActiveModal
    ) {

    }

    ngOnInit(): void {
    }



}

@Component({
    selector: 'abm-agregar-modal',
    templateUrl: './abm-agregar-modal.component.html'
})
@Injectable()
export class AbmAgregarModalComponent {
    /**
     * @var ofertaid id de la oferta.
     */
    @Input("titulo")  public titulo: string;
    @Input("tipo")  public tipo: string;
    @Input("datos") public datos: any;
    @Input("armarForm") public armarForm: any;


    constructor(private modalService: NgbModal) { }

    open() {
        const modalRef = this.modalService.open(ModalContentAbmAgregar, { size: 'lg' });
        modalRef.componentInstance.titulo = this.titulo;
        modalRef.componentInstance.tipo = this.tipo;
        modalRef.componentInstance.datos = this.datos;
        modalRef.componentInstance.armarForm = this.armarForm;
    }
}
