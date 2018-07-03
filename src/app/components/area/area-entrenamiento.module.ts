// Imports necesarios para crear módulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { ChartsModule } from 'ng2-charts';

//Importo los componentes
import { AreaEntrenamientoComponent } from './area-entrenamiento.component';
import { ListaAreaEntrenamientoComponent } from './lista/lista-area-entrenamiento.component';


// Metadatos del módulo
@NgModule({
    declarations: [AreaEntrenamientoComponent, ListaAreaEntrenamientoComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot()],
    exports: [AreaEntrenamientoComponent, ListaAreaEntrenamientoComponent, ReactiveFormsModule]
    //entryComponents: [NgbdModalContentGrafica]
})
export class AreaEntrenamientoModule { }