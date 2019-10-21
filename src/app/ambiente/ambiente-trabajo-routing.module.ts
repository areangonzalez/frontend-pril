import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmbienteTrabajoComponent } from './ambiente-trabajo.component';
import { VistaAmbienteTrabajoComponent } from './vista/vista-ambiente-trabajo.component';
import { FormAmbienteTrabajoComponent } from './form/form-ambiente-trabajo.component';
import { OfertaComponent } from './oferta/oferta.component';
import { AmbienteTrabajoService, TipoAmbienteTrabajoService } from '../core/services';

const routes: Routes = [
    {
      path: '', component: AmbienteTrabajoComponent,
      data: { loading: true, title: 'Lista ambiente de Trabajo' },
      resolve: { ambientes: AmbienteTrabajoService}
    },
    {
      path: 'vista/:id', component: VistaAmbienteTrabajoComponent,
      data: { loading: true, title: 'Ver ambiente de Trabajo' }
    },{
      path: 'agregar', component: FormAmbienteTrabajoComponent,
      data: { loading: true, title: 'Agregar ambiente de Trabajo' },
      resolve: { tipoAmbienteTrabajoLista: TipoAmbienteTrabajoService}
    },{
      path: 'editar/:id', component: FormAmbienteTrabajoComponent,
      data: { loading: true, title: 'Editar ambiente de Trabajo' },
      resolve: { tipoAmbienteTrabajoLista: TipoAmbienteTrabajoService}
    },{
      path: ':id/ofertas', component: OfertaComponent,
      data: { loading: true, title: 'Ofertas' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  //  providers: [ProgramaService, TipoRecursoService] // <-- aca tenes que decirle al routing los servicios que vas a utilizar
})
export class AmbienteTrabajoRoutingModule { }
