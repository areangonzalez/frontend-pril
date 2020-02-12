import { Component, Input, Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MensajesService } from '../../core/services';
import { ConfigModal } from '../../core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { compareValidator } from 'src/app/shared/helpers/compare-validator';


@Component({
    selector: 'dar-rol-permiso',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Rol y permisos de usuario</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('closed')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <div class="row" [formGroup]="rolPermisoForm">
          <div class="col-md-4">
          <label for="roles" class="prioridad">Rol (<span>*</span>):</label>
            <select class="form-control" id="roles" formControlName="rol" >
                <option value="">Seleccione Rol</option>
                <!-- <option *ngFor="let tipo of tipo_ambiente_trabajo_lista" value="{{tipo.id}}">{{tipo.nombre}}</option> -->
            </select>
            <!-- <div *ngIf="(ambiente.get('tipo_ambiente_trabajoid').invalid && submitted)"
                class="text-danger"> [ngClass]="{'is-invalid': (ambiente.get('tipo_ambiente_trabajoid').invalid && submitted)}"
                <div *ngIf="ambiente.get('tipo_ambiente_trabajoid').hasError('required')">Este campo es requerido. </div>
            </div> -->
          </div>
          <div class="col-md-4"></div>
        </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="activeModal.close('closed')" >Cancelar</button>
      <button type="button" class="btn btn-success" (click)="validarForm()" >Guardar</button>
    </div>
  `
})
@Injectable()
export class ModalContentGuDarRolPermiso implements OnInit {
  @Input("tipo") public tipo: string; // tipo agregar/modificar
  @Output("guardarPermiso") guardarPermiso = new EventEmitter();

  public submitted: boolean = false;
  public rolPermisoForm: FormGroup;

    constructor( private _mensajesService: MensajesService, public activeModal: NgbActiveModal, private _fb: FormBuilder) {
      this.rolPermisoForm = _fb.group({
        rol: ['', Validators.required]
      });
    }

    ngOnInit(): void {
    }

    cancelar(cancela:boolean){
      this.activeModal.close('closed');
    }

    validarForm(){
      this.submitted = true;
      if (this.rolPermisoForm.invalid) {
        return;
      }else{
        this.guardarPermiso.emit(this.rolPermisoForm);
      }
    }

    obtenerDatos(datos:any){
      this.activeModal.close(datos);
    }

}

@Component({
    selector: 'gu-dar-rol-permiso',
    template: `
      <button type="button" class="btn btn-outline-warning btn-sm" (click)="open()"><i class="fas fa-key"></i></button>
    `
})
@Injectable()
export class GuDarRolPermisoModalComponent {
  @Input("tipo") public tipo: string; // tipo agregar/modificar
  @Output("obtenerDatos") obtenerDatos = new EventEmitter();
  /* @Input("titulo") public titulo: string;
  @Input("importarDatos") public importarDatos: any;
  @Input("armarForm") public armarForm: any;
  @Output("obtenerDatos") public obtenerDatos = new EventEmitter(); */


  constructor(private modalService: NgbModal, configModal: NgbModalConfig) {
    configModal.backdrop = 'static';
    configModal.keyboard = false;
  }

  open() {
      const modalRef = this.modalService.open(ModalContentGuDarRolPermiso, { size: 'lg' });
      modalRef.componentInstance.tipo = this.tipo;
      /* modalRef.componentInstance.titulo = this.titulo;
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
