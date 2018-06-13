// Imports necesarios para crear módulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { ChartsModule } from 'ng2-charts';

//Importo los componentes
import { DestinatarioComponent } from './destinatario.component';
import { FormDestinatarioComponent } from './form/form-destinatario.component';
import { ListaDestinatarioComponent } from './lista/lista-destinatario.component';
import { VistaDestinatarioComponent } from './vista/vista-destinatario.component';
import { BusquedaDestinatarioComponent } from "./busqueda/busqueda-destinatario.component";

// Metadatos del módulo
@NgModule({
    declarations: [DestinatarioComponent, FormDestinatarioComponent, ListaDestinatarioComponent, VistaDestinatarioComponent, BusquedaDestinatarioComponent],
    imports: [CommonModule, FormsModule, NgbModule.forRoot()],
    exports: [DestinatarioComponent, FormDestinatarioComponent, ListaDestinatarioComponent, VistaDestinatarioComponent, BusquedaDestinatarioComponent]
    //entryComponents: [NgbdModalContentGrafica]
})
export class DestinatarioModule { }
