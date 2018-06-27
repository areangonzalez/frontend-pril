// Imports necesarios para crear módulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { ChartsModule } from 'ng2-charts';

//Importo los componentes
import { DestinatarioComponent } from './destinatario.component';
import { FormDestinatarioComponent } from './form/form-destinatario.component';
import { ListaDestinatarioComponent } from './lista/lista-destinatario.component';
import { VistaDestinatarioComponent } from './vista/vista-destinatario.component';
import { BusquedaDestinatarioComponent } from "./busqueda/busqueda-destinatario.component";
import { DatosPersonaComponent } from "./form/persona/datos-persona.component";
import { DatosDestinatarioComponent } from "./form/destinatario/datos-destinatario.component";

// Metadatos del módulo
@NgModule({
    declarations: [DestinatarioComponent, FormDestinatarioComponent, ListaDestinatarioComponent, VistaDestinatarioComponent, BusquedaDestinatarioComponent, DatosPersonaComponent, DatosDestinatarioComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot()],
    exports: [DestinatarioComponent, FormDestinatarioComponent, ListaDestinatarioComponent, VistaDestinatarioComponent, BusquedaDestinatarioComponent, DatosPersonaComponent, DatosDestinatarioComponent, ReactiveFormsModule]
    //entryComponents: [NgbdModalContentGrafica]
})
export class DestinatarioModule { }
