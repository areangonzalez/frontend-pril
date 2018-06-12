// Imports necesarios para crear módulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { ChartsModule } from 'ng2-charts';

//Importo los componentes
import { DestinatarioComponent } from './destinatario.component';
import { FormComponent } from './form/form.component';
import { ListaComponent } from './lista/lista.component';
import { VistaComponent } from './vista/vista.component';
import { BusquedaComponent } from "./busqueda/busqueda.component";

// Metadatos del módulo
@NgModule({
    declarations: [DestinatarioComponent, FormComponent, ListaComponent, VistaComponent, BusquedaComponent],
    imports: [CommonModule, FormsModule, NgbModule.forRoot()],
    exports: [DestinatarioComponent, FormComponent, ListaComponent, VistaComponent, BusquedaComponent]
    //entryComponents: [NgbdModalContentGrafica]
})
export class DestinatarioModule { }
