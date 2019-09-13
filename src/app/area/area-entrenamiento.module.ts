// Imports necesarios para crear módulos
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";
import { AreaEntrenamientoRoutingModule } from "./area-entrenamiento-routing.module";

//Importo los componentes
//import { ListaOfertaComponent } from "./../ambiente/oferta/lista/lista-oferta.component";
import { AreaEntrenamientoComponent } from './area-entrenamiento.component';
import { ListaAreaEntrenamientoComponent } from './lista/lista-area-entrenamiento.component';
import { BusquedaAreaEntrenamientoComponent } from "./busqueda/busqueda-area-entrenamiento.component";
import { SeleccionFormAreaEntrenamientoComponent } from "./form/seleccion/seleccion-form-area-entrenamiento.component";
import { ListaOfertaAreaEntrenamientoComponent } from "./lista/oferta/lista-oferta-area-entrenamiento.component";
import { ListaDestinatarioAreaEntrenamientoComponent } from "./lista/destinatario/lista-destinatario-area-entrenamiento.component";
import { PlanFormAreaEntrenamientoComponent } from "./form/plan/plan-form-area-entrenamiento.component";
import { VistaAreaEntrenamientoComponent } from "./vista/vista-area-entrenamiento.component";



// Metadatos del módulo
@NgModule({
    declarations: [AreaEntrenamientoComponent, ListaAreaEntrenamientoComponent, BusquedaAreaEntrenamientoComponent, SeleccionFormAreaEntrenamientoComponent, ListaOfertaAreaEntrenamientoComponent, ListaDestinatarioAreaEntrenamientoComponent, PlanFormAreaEntrenamientoComponent, VistaAreaEntrenamientoComponent],
    imports: [CommonModule, NgbModule, SharedModule,  AreaEntrenamientoRoutingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [AreaEntrenamientoComponent, ListaAreaEntrenamientoComponent, BusquedaAreaEntrenamientoComponent, SeleccionFormAreaEntrenamientoComponent, ListaOfertaAreaEntrenamientoComponent, ListaDestinatarioAreaEntrenamientoComponent, PlanFormAreaEntrenamientoComponent, VistaAreaEntrenamientoComponent]
})
export class AreaEntrenamientoModule { }
