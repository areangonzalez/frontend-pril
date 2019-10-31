import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaEntrenamientoComponent } from "./area-entrenamiento.component";
import { SeleccionFormAreaEntrenamientoComponent, PlanFormAreaEntrenamientoComponent } from "./form";
import { VistaAreaEntrenamientoComponent } from "./vista/vista-area-entrenamiento.component";
import { DestinatarioService, OfertaService, PlanService, AreaEntrenamientoService } from '../core/services';

const routes: Routes = [
    {
      path: '', component: AreaEntrenamientoComponent,
      data: { loading: true, title: 'Lista área de entrenamiento', breadcrumb: 'Lista' },
      resolve: { listadoAreas: AreaEntrenamientoService }
    },
    {
      path: 'crear-seleccion', component: SeleccionFormAreaEntrenamientoComponent,
      data: { loading: true, title: 'Crear área de entrenamiento', breadcrumb: 'Seleccionar destinatario y oferta' },
      resolve: { destinatarios: DestinatarioService, ofertas: OfertaService }
    },{
      path: 'crear-plan/:destinatarioid/:ofertaid', component: PlanFormAreaEntrenamientoComponent,
      data: { loading: true, title: 'Crear área de entrenamiento', breadcrumb: 'Crear plan' },
      resolve: { destinatario: DestinatarioService, oferta: OfertaService, planes: PlanService }
    },{
      path: 'vista/:area_entrenamientoid', component: VistaAreaEntrenamientoComponent,
      data: { loading: true, title: 'Ver área de entrenamiento', breadcrumb: 'vista' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [DestinatarioService, OfertaService]
})
export class AreaEntrenamientoRoutingModule { }
