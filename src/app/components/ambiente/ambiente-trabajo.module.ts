// Imports necesarios para crear módulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { ChartsModule } from 'ng2-charts';

//Importo los componentes
import { AmbienteTrabajoComponent } from './ambiente-trabajo.component';
import { ListaAmbienteTrabajoComponent } from './lista/lista-ambiente-trabajo.component';
import { BusquedaAmbienteTrabajoComponent } from './busqueda/busqueda-ambiente-trabajo.component';
import { VistaAmbienteTrabajoComponent } from "./vista/vista-ambiente-trabajo.component";
import { FormAmbienteTrabajoComponent } from "./form/form-ambiente-trabajo.component";
import { OfertaComponent } from "./vista/oferta/oferta.component";


// Metadatos del módulo
@NgModule({
    declarations: [AmbienteTrabajoComponent, ListaAmbienteTrabajoComponent, BusquedaAmbienteTrabajoComponent, VistaAmbienteTrabajoComponent, OfertaComponent, FormAmbienteTrabajoComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot()],
    exports: [AmbienteTrabajoComponent, ListaAmbienteTrabajoComponent, BusquedaAmbienteTrabajoComponent, VistaAmbienteTrabajoComponent, OfertaComponent, FormAmbienteTrabajoComponent, ReactiveFormsModule]
    //entryComponents: [NgbdModalContentGrafica]
})
export class AmbienteTrabajoModule { }
