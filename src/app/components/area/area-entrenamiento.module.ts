// Imports necesarios para crear módulos
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListaOfertaComponent } from "./../ambiente/oferta/lista/lista-oferta.component";
import { DestinatarioModule } from "../destinatario/destinatario.module";
//import { ChartsModule } from 'ng2-charts';

//Importo los componentes
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
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DestinatarioModule, NgbModule.forRoot()],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [AreaEntrenamientoComponent, ListaAreaEntrenamientoComponent, BusquedaAreaEntrenamientoComponent, SeleccionFormAreaEntrenamientoComponent, ListaOfertaAreaEntrenamientoComponent, ListaDestinatarioAreaEntrenamientoComponent, PlanFormAreaEntrenamientoComponent, VistaAreaEntrenamientoComponent, ReactiveFormsModule],
    entryComponents: [ListaOfertaComponent]
})
export class AreaEntrenamientoModule { }
