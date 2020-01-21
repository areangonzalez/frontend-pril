import { Component, Input, Injectable, OnInit, Output, EventEmitter } from '@angular/core';
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
            <abm-form [armarForm]="armarForm" (cancelarForm)="cancelar($event)" (obtenerDatos)="obtenerDatos($event)"></abm-form>
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

    cancelar(cancela:boolean){
      this.activeModal.close('closed');
    }

    obtenerDatos(datos:any){
      this.activeModal.close(datos);
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
    @Output("obtenerDatos") public obtenerDatos = new EventEmitter();


    constructor(private modalService: NgbModal) { }

    open() {
        const modalRef = this.modalService.open(ModalContentAbmAgregar, { size: 'sm' });
        modalRef.componentInstance.titulo = this.titulo;
        modalRef.componentInstance.tipo = this.tipo;
        modalRef.componentInstance.datos = this.datos;
        modalRef.componentInstance.armarForm = this.armarForm;
        modalRef.result.then(
          (result) => {
            if (result == 'closed') {
            }else{
              this.obtenerDatos.emit(result);
            }
          }
        )
    }
}
