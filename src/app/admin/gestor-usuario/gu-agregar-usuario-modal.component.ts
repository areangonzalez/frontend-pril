import { Component, Input, Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MensajesService } from '../../core/services';
import { ConfigModal } from '../../core/models';

@Component({
    selector: 'modal-content-abm-agregar',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Agregar Usuario</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('closed')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
            Hola mundo!!
    </div>
  `
})
@Injectable()
export class ModalContentAgregarUsuario implements OnInit {
    /* @Input("titulo") public titulo: string;
    @Input("tipo") public tipo: string; // tipo agregar/modificar
    @Input('importarDatos') public importarDatos: any;
    @Input('aermarForm') public armarForm: string; */

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
    selector: 'gu-agregar-usuario-modal',
    template: `
      <button type="button" class="btn btn-outline-success " (click)="open()" ><i class="fas fa-user-plus"></i>&nbsp;Nuevo</button>
    `
})
@Injectable()
export class GuAgregarUsuarioModalComponent {
  /* @Input("titulo") public titulo: string;
  @Input("tipo") public tipo: string; // tipo agregar/modificar
  @Input("importarDatos") public importarDatos: any;
  @Input("armarForm") public armarForm: any;
  @Output("obtenerDatos") public obtenerDatos = new EventEmitter(); */


  constructor(private modalService: NgbModal) { }

  open() {
      const modalRef = this.modalService.open(ModalContentAgregarUsuario, { size: 'lg' });
      /* modalRef.componentInstance.titulo = this.titulo;
      modalRef.componentInstance.tipo = this.tipo;
      modalRef.componentInstance.importarDatos = this.importarDatos;
      modalRef.componentInstance.armarForm = this.armarForm; */
      modalRef.result.then(
        (result) => {
          if (result == 'closed') {
     //       this.obtenerDatos.emit(false);
          }else{
       //     this.obtenerDatos.emit(result);
          }
        }
      )
  }
}
