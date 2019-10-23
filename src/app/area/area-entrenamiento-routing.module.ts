import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaEntrenamientoComponent } from "./area-entrenamiento.component";
import { SeleccionFormAreaEntrenamientoComponent, PlanFormAreaEntrenamientoComponent } from "./form";
import { VistaAreaEntrenamientoComponent } from "./vista/vista-area-entrenamiento.component";
import { DestinatarioService, OfertaService } from '../core/services';

const routes: Routes = [
    {
      path: '', component: AreaEntrenamientoComponent,
      data: { loading: true, title: 'Lista área de entrenamiento' },
      /* resolve: { programas: ProgramaService, tipoRecursos: TipoRecursoService } */
    },
    {
      path: 'crear-seleccion', component: SeleccionFormAreaEntrenamientoComponent,
      data: { loading: true, title: 'Crear área de entrenamiento' },
      resolve: { destinatarios: DestinatarioService, /* ofertas: OfertaService */ }
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
    providers: [DestinatarioService, OfertaService]
})
export class AreaEntrenamientoRoutingModule { }
