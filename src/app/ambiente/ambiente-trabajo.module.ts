// Imports necesarios para crear módulos
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";
import { AmbienteTrabajoRoutingModule } from "./ambiente-trabajo-routing.module";

//Importo los componentes

import { OfertaComponent } from "./oferta/oferta.component";
import { AmbienteTrabajoComponent } from './ambiente-trabajo.component';
import { VistaAmbienteTrabajoComponent } from "./vista/vista-ambiente-trabajo.component";
import { FormAmbienteTrabajoComponent } from "./form/form-ambiente-trabajo.component";


// Metadatos del módulo
@NgModule({
    declarations: [AmbienteTrabajoComponent, VistaAmbienteTrabajoComponent, OfertaComponent, FormAmbienteTrabajoComponent],
    imports: [CommonModule, NgbModule, SharedModule, AmbienteTrabajoRoutingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [AmbienteTrabajoComponent, VistaAmbienteTrabajoComponent, OfertaComponent, FormAmbienteTrabajoComponent],
})
export class AmbienteTrabajoModule { }
