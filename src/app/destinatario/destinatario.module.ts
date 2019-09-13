// Imports necesarios para crear módulos
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";
import { DestinatarioRoutingModule } from './destinatario-routing.module'
//Importo los componentes
import { DestinatarioComponent } from './destinatario.component';
import { FormDestinatarioComponent } from './form/form-destinatario.component';

// Metadatos del módulo
@NgModule({
    declarations: [
      DestinatarioComponent, FormDestinatarioComponent
    ],
    imports: [
      CommonModule, NgbModule, SharedModule, DestinatarioRoutingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
      DestinatarioComponent, FormDestinatarioComponent
    ]

})
export class DestinatarioModule { }
