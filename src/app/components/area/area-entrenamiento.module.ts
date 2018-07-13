// Imports necesarios para crear módulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListaOfertaComponent } from "./../ambiente/oferta/lista/lista-oferta.component";
//import { ChartsModule } from 'ng2-charts';

//Importo los componentes
import { AreaEntrenamientoComponent } from './area-entrenamiento.component';
import { ListaAreaEntrenamientoComponent } from './lista/lista-area-entrenamiento.component';
import { BusquedaAreaEntrenamientoComponent } from "./busqueda/busqueda-area-entrenamiento.component";
import { SeleccionFormAreaEntrenamientoComponent } from "./form/seleccion/seleccion-form-area-entrenamiento.component";
import { ListaOfertaAreaEntrenamientoComponent } from "./lista/oferta/lista-oferta-area-entrenamiento.component";
import { ListaDestinatarioAreaEntrenamientoComponent } from "./lista/destinatario/lista-destinatario-area-entrenamiento.component";
import { PlanFormAreaEntrenamientoComponent } from "./form/plan/plan-form-area-entrenamiento.component";
import { VistaOfertaAreaEntrenamientoComponent } from "./vista/oferta/vista-oferta-area-entrenamiento.component";
import { VistaDestinatarioAreaEntrenamientoComponent } from "./vista/destinatario/vista-destinatario-area-entrenamiento.component";
import { VistaAmbienteTrabajoAreaEntrenamientoComponent } from "./vista/ambiente-trabajo/vista-ambiente-trabajo-area-entrenamiento.component";
import { VistaAreaEntrenamientoComponent } from "./vista/vista-area-entrenamiento.component";



// Metadatos del módulo
@NgModule({
    declarations: [AreaEntrenamientoComponent, ListaAreaEntrenamientoComponent, BusquedaAreaEntrenamientoComponent, SeleccionFormAreaEntrenamientoComponent, ListaOfertaAreaEntrenamientoComponent, ListaDestinatarioAreaEntrenamientoComponent, PlanFormAreaEntrenamientoComponent, VistaOfertaAreaEntrenamientoComponent, VistaDestinatarioAreaEntrenamientoComponent, VistaAreaEntrenamientoComponent, VistaAmbienteTrabajoAreaEntrenamientoComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot()],
    exports: [AreaEntrenamientoComponent, ListaAreaEntrenamientoComponent, BusquedaAreaEntrenamientoComponent, SeleccionFormAreaEntrenamientoComponent, ListaOfertaAreaEntrenamientoComponent, ListaDestinatarioAreaEntrenamientoComponent, PlanFormAreaEntrenamientoComponent, VistaOfertaAreaEntrenamientoComponent, VistaDestinatarioAreaEntrenamientoComponent, VistaAreaEntrenamientoComponent, VistaAmbienteTrabajoAreaEntrenamientoComponent, ReactiveFormsModule],
    entryComponents: [ListaOfertaComponent]
})
export class AreaEntrenamientoModule { }