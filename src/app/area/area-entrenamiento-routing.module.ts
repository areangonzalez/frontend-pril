import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaEntrenamientoComponent } from "./area-entrenamiento.component";
import { SeleccionFormAreaEntrenamientoComponent } from './form/seleccion/seleccion-form-area-entrenamiento.component';
import { PlanFormAreaEntrenamientoComponent } from "./form/plan/plan-form-area-entrenamiento.component";
import { VistaAreaEntrenamientoComponent } from "./vista/vista-area-entrenamiento.component";

const routes: Routes = [
    {
      path: '', component: AreaEntrenamientoComponent,
      data: { loading: true, title: 'Lista área de entrenamiento' },
      /* resolve: { programas: ProgramaService, tipoRecursos: TipoRecursoService } */
    },
    {
      path: 'crear-seleccion', component: SeleccionFormAreaEntrenamientoComponent,
      data: { loading: true, title: 'Crear área de entrenamiento' }
    },{
      path: 'crear-plan/:destinatarioid/:ofertaid', component: PlanFormAreaEntrenamientoComponent, data: { loading: true, title: 'Crear área de entrenamiento' }
    },{
      path: 'area-entrenamiento/vista/:id', component: VistaAreaEntrenamientoComponent,
      data: { loading: true, title: 'Ver área de entrenamiento' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  //  providers: [ProgramaService, TipoRecursoService]
})
export class AreaEntrenamientoRoutingModule { }
