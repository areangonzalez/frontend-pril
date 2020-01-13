import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { VistaOficioComponent, VistaPlanComponent, VistaProfesionComponent, VistaRedesSocialesComponent, VistaTipoAmbienteTrabajoComponent } from './vistas';
import { OficioService } from '../core/services';
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
      path: 'plan', component: VistaPlanComponent, data: { title: 'Plan' }
    },
    {
      path: 'profesion', component: VistaProfesionComponent, data: { title: 'Profesión' }
    },
    {
      path: 'redes-sociales', component: VistaRedesSocialesComponent, data: { title: 'Redes Sociales' }
    },
    {
      path: 'tipo-ambiente-trabajo', component: VistaTipoAmbienteTrabajoComponent, data: { title: 'Tipo Ambiente de Trabajo' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    //providers: [DetalleProgramaService]
})
export class AdminRoutingModule { }
