import { Component, Input, Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MensajesService, RolService, PermisoService } from "../../core/services";

@Component({
    selector: 'modal-content-permisos',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Rol y permisos de usuario</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close('closed')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <div class="row" [formGroup]="rolForm">
          <div class="col-md-4">
          <label for="rolid" class="prioridad">Rol (<span>*</span>):</label>
            <select class="form-control" id="rolid" formControlName="rolid" [ngClass]="{'is-invalid': (rolForm.get('rolid').invalid && submitted)}" >
                <option value="">Seleccione Rol</option>
                <option value="1">Usuario</option>
                <!-- <option *ngFor="let rol of roles" value="{{rol.id}}">{{rol.nombre}}</option> -->
            </select>
            <div *ngIf="(rolForm.get('rolid').invalid && submitted)"
                class="text-danger" >
                <div *ngIf="rolForm.get('rolid').hasError('required')">Este campo es requerido. </div>
            </div>
          </div>
          <div class="col-md-12">
            <tag-component [listaTags]="permisos" [tituloComponente]="'Seleccionar Permiso/s'" [placeHolderComponente]="'Seleccione un Permiso'" [textMsjError]="'Este permiso ya fue seleccionado'" [setListaTags]="listadoPermisos" (obtenerTags)="getListaPermisos($event)"></tag-component>
          </div>
        </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="cancelar()" >Cancelar</button>
      <button type="button" class="btn btn-success" (click)="validarForm()" >Guardar</button>
    </div>
  `
})
@Injectable()
export class ModalContentGuPermisos {
    @Input('tipo') public ambienteid: number;
    @Input('roles') public roles: number;
    @Input('permisos') public permisos: number;

    public submitted = false;
    public rolForm: FormGroup;
    public listadoPermisos: any = [];
    //public permisos = [{ id: 1, nombre: "Crear" },{ id: 2, nombre: "Editar" }];

     constructor(
         public activeModal: NgbActiveModal,
         private _fb: FormBuilder,
         private _mensajeService: MensajesService,
        ) {
         this.rolForm = _fb.group({
             rolid: ["", Validators.required],
         });
    }

    validarForm() {
      this.submitted = true;
      if (this.rolForm.invalid) {
          this._mensajeService.cancelado('Campos sin completar.', [{ name: '' }]);
          return;
      } else {
        let rolPermiso = { rolid: this.rolForm.get('rolid').value, permiso: this.listadoPermisos };
        this.activeModal.close(rolPermiso);
      }
    }

    cancelar() {
      this.activeModal.close('closed')
    }

    getListaPermisos(listado: any) {
      this.listadoPermisos = listado;
    }
}

@Component({
    selector: 'modal-rol-permiso',
    template: `
      <button type="button" class="btn btn-outline-warning btn-sm" (click)="open()"><i class="fas fa-key"></i></button>
    `
})
@Injectable()
export class GuPermisosModalComponent implements OnInit {
    /**
     * @var tipo
     */
    @Input("tipo") tipo; // variable que personaliza el icono del boton por ejemplo agregar/modificar.
    @Output("guardarPermisos") guardarPermisos = new EventEmitter();

    public roles: any;
    public permisos: any;

    constructor(private modalService: NgbModal, private _rolService: RolService, private _permisoService: PermisoService) { }

    ngOnInit() {
      this.rol();
      this.permiso();
    }

    open() {
        const modalRef = this.modalService.open(ModalContentGuPermisos, { size: 'lg' });
        modalRef.componentInstance.tipo = this.tipo;
        modalRef.componentInstance.roles = this.roles;modalRef.componentInstance.permisos = this.permisos;
        modalRef.result.then(
            (result) => {
                if (result == 'close') {
                  return this.guardarPermisos.emit(false);
                } else {
                  return this.guardarPermisos.emit(result);
                }
            }
        );
    }

    rol() {
      this._rolService.listado().subscribe(
        respuesta => {
          this.roles = respuesta;
        })
    }

    permiso() {
      this._permisoService.listado().subscribe(
        respuesta => {
          this.permisos = respuesta;
        })
    }
}
