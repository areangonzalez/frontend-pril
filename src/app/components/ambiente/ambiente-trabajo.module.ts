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
import { AmbienteTrabajoFormComponent } from "./form/ambiente-trabajo/ambiente-trabajo-form.component";
import { RepresentanteFormComponent } from "./form/representante/representante-form.component";
import { OfertaComponent } from "./oferta/oferta.component";
import { ListaOfertaComponent } from "./oferta/lista/lista-oferta.component";
import { FormOfertaComponent } from "./oferta/form/form-oferta.components";


// Metadatos del módulo
@NgModule({
    declarations: [AmbienteTrabajoComponent, ListaAmbienteTrabajoComponent, BusquedaAmbienteTrabajoComponent, VistaAmbienteTrabajoComponent, OfertaComponent, FormAmbienteTrabajoComponent, AmbienteTrabajoFormComponent, RepresentanteFormComponent, ListaOfertaComponent, FormOfertaComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot()],
    exports: [AmbienteTrabajoComponent, ListaAmbienteTrabajoComponent, BusquedaAmbienteTrabajoComponent, VistaAmbienteTrabajoComponent, OfertaComponent, FormAmbienteTrabajoComponent, AmbienteTrabajoFormComponent, RepresentanteFormComponent, ListaOfertaComponent, FormOfertaComponent, ReactiveFormsModule]
    //entryComponents: [NgbdModalContentGrafica]
})
export class AmbienteTrabajoModule { }
