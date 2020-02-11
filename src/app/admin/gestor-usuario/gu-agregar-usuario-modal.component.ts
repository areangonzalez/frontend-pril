import { Component, Input, Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MensajesService } from '../../core/services';
import { ConfigModal } from '../../core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { compareValidator } from 'src/app/shared/helpers/compare-validator';


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
      <gu-form-agente [agenteForm]="this.usuarioForm.get('agente')" [submitted]="submitted" ></gu-form-agente>
      <gu-form-usuario [usuarioForm]="this.usuarioForm" [submitted]="submitted" ></gu-form-usuario>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="activeModal.close('closed')" >Cancelar</button>
      <button type="button" class="btn btn-success" (click)="validarForm()" >Guardar</button>
    </div>
  `
})
@Injectable()
export class ModalContentAgregarUsuario implements OnInit {
  @Input("tipo") public tipo: string; // tipo agregar/modificar
  @Output("guardarUsuario") guardarUsuario = new EventEmitter();

  public submitted: boolean = false;
  public usuarioForm: FormGroup;

    constructor( private _mensajesService: MensajesService, public activeModal: NgbActiveModal, private _fb: FormBuilder) {
      this.usuarioForm = _fb.group({
        user_name: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        comf_password: ['', [Validators.required, compareValidator('password')]],
        agente: _fb.group({
          nro_documento: ['', Validators.required],
          nombre: ['', Validators.required],
          apellido: ['', Validators.required]
        })
      });
    }

    ngOnInit(): void {
    }

    cancelar(cancela:boolean){
      this.activeModal.close('closed');
    }

    validarForm(){
      this.submitted = true;
      if (this.usuarioForm.invalid) {
        this._mensajesService.cancelado('Campos sin completar.', [{ name: '' }]);
        return;
      }else{
        this.guardarUsuario.emit(this.usuarioForm);
      }
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
  @Output("obtenerDatos") obtenerDatos = new EventEmitter();
  /* @Input("titulo") public titulo: string;
  @Input("tipo") public tipo: string; // tipo agregar/modificar
  @Input("importarDatos") public importarDatos: any;
  @Input("armarForm") public armarForm: any;
  @Output("obtenerDatos") public obtenerDatos = new EventEmitter(); */


  constructor(private modalService: NgbModal, configModal: NgbModalConfig) {
    configModal.backdrop = 'static';
    configModal.keyboard = false;
  }

  open() {
      const modalRef = this.modalService.open(ModalContentAgregarUsuario, { size: 'lg' });
      /* modalRef.componentInstance.titulo = this.titulo;
      modalRef.componentInstance.tipo = this.tipo;
      modalRef.componentInstance.importarDatos = this.importarDatos;
      modalRef.componentInstance.armarForm = this.armarForm; */
      modalRef.result.then(
        (result) => {
          if (result == 'closed') {
            this.obtenerDatos.emit(false);
          }else{
            this.obtenerDatos.emit(result);
          }
        }
      )
  }
}
