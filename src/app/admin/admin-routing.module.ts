import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { VistaOficioComponent, VistaPlanComponent, VistaProfesionComponent, VistaTipoAmbienteTrabajoComponent } from './vistas';
import { OficioService, PlanService, ProfesionService, TipoAmbienteTrabajoService } from '../core/services';
//import { DetalleProgramaService } from "../core/services";

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        data: { title: 'Admin' },
        /* resolve: {
          programas: DetalleProgramaService
        } */
    },
    {
      path: 'oficio', component: VistaOficioComponent, data: { title: 'Oficio' }, resolve: { oficios: OficioService }
    },
    {
      path: 'plan', component: VistaPlanComponent, data: { title: 'Plan' }, resolve: { planes: PlanService }
    },
    {
      path: 'profesion', component: VistaProfesionComponent, data: { title: 'Profesión' }, resolve: { profesiones: ProfesionService }
    },
    {
      path: 'tipo-ambiente-trabajo', component: VistaTipoAmbienteTrabajoComponent, data: { title: 'Tipo Ambiente de Trabajo' }, resolve: { tipoAmbienteTrabajos: TipoAmbienteTrabajoService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    //providers: [DetalleProgramaService]
})
export class AdminRoutingModule { }
