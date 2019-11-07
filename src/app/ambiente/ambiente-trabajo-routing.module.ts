import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmbienteTrabajoComponent } from './ambiente-trabajo.component';
import { VistaAmbienteTrabajoComponent } from './vista/vista-ambiente-trabajo.component';
import { FormAmbienteTrabajoComponent } from './form/form-ambiente-trabajo.component';
import { OfertaComponent } from './oferta/oferta.component';
import { AmbienteTrabajoService, TipoAmbienteTrabajoService, OfertaService, LocalidadService } from '../core/services';

const routes: Routes = [
    {
      path: '', component: AmbienteTrabajoComponent,
      data: { loading: true, title: 'Lista ambiente de Trabajo', breadcrumb: 'Lista'},
      resolve: { ambientes: AmbienteTrabajoService, tipoAmbienteTrabajoLista: TipoAmbienteTrabajoService, localidadLista: LocalidadService}
    },
    {
      path: 'vista/:ambienteid', component: VistaAmbienteTrabajoComponent,
      data: { loading: true, title: 'Ver ambiente de Trabajo', breadcrumb: 'Vista'},
      resolve: { ambiente: AmbienteTrabajoService, ofertaLista: OfertaService}
    },{
      path: 'agregar', component: FormAmbienteTrabajoComponent,
      data: { loading: true, title: 'Agregar ambiente de Trabajo', breadcrumb: 'Nuevo'},
      resolve: { tipoAmbienteTrabajoLista: TipoAmbienteTrabajoService}
    },{
      path: 'editar/:ambienteid', component: FormAmbienteTrabajoComponent,
      data: { loading: true, title: 'Editar ambiente de Trabajo', breadcrumb: 'Editar'},
      resolve: { ambiente: AmbienteTrabajoService, tipoAmbienteTrabajoLista: TipoAmbienteTrabajoService}
    },{
      path: ':ambienteid/ofertas', component: OfertaComponent,
      data: { loading: true, title: 'Ofertas', breadcrumb: 'Lista de ofertas'},
      resolve: { ofertaLista: OfertaService}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AmbienteTrabajoService, TipoAmbienteTrabajoService, OfertaService] // <-- aca tenes que decirle al routing los servicios que vas a utilizar
})
export class AmbienteTrabajoRoutingModule { }
