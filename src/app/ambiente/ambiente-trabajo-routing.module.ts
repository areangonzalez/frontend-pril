import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmbienteTrabajoComponent } from './ambiente-trabajo.component';
import { VistaAmbienteTrabajoComponent } from './vista/vista-ambiente-trabajo.component';
import { FormAmbienteTrabajoComponent } from './form/form-ambiente-trabajo.component';
import { OfertaComponent } from './oferta/oferta.component';

const routes: Routes = [
    {
      path: '', component: AmbienteTrabajoComponent,
      data: { loading: true, title: 'Lista ambiente de Trabajo' }
      /**
       *
       * Aqui tenes que aplicar el resolve el de abajo es un ejemplo esta comentado porque esos servicios no funcionan en este sistema.
       * Declara el resolve en el path donde vas a utilizar la pre-carga de datos.
       *
       */
      /* resolve: { programas: ProgramaService, tipoRecursos: TipoRecursoService } */
    },
    {
      path: 'vista/:id', component: VistaAmbienteTrabajoComponent,
      data: { loading: true, title: 'Ver ambiente de Trabajo' }
    },{
      path: 'agregar', component: FormAmbienteTrabajoComponent,
      data: { loading: true, title: 'Agregar ambiente de Trabajo' }
    },{
      path: 'editar/:id', component: FormAmbienteTrabajoComponent,
      data: { loading: true, title: 'Editar ambiente de Trabajo' }
    },{
      path: 'ambiente/:id/ofertas', component: OfertaComponent,
      data: { loading: true, title: 'Ofertas' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  //  providers: [ProgramaService, TipoRecursoService] // <-- aca tenes que decirle al routing los servicios que vas a utilizar
})
export class AmbienteTrabajoRoutingModule { }
