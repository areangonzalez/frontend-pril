import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DestinatarioComponent } from "./destinatario.component";
import { FormDestinatarioComponent } from './form/form-destinatario.component';
import { VistaDestinatarioComponent } from "./vista/vista-destinatario.component";
import { EstudioComponent } from "./form/estudio/estudio.component";

const routes: Routes = [
    {
      path: '', component: DestinatarioComponent,
      data: { loading: true, title: 'Lista destinatarios', breadcrumb: 'Destinatario' }
      /* resolve: { programas: ProgramaService, tipoRecursos: TipoRecursoService } */
    },
    {
      path: 'agregar', component: FormDestinatarioComponent,
      data: { loading: true, title: 'Agregar destinatario', breadcrumb: 'Agregar' }
    },{
      path: 'editar/:id', component: FormDestinatarioComponent,
      data: { loading: true, title: 'Editar destinatario', breadcrumb: 'Editar' }
    },{
      path: 'vista/:id', component: VistaDestinatarioComponent,
      data: { loading: true, title: 'Ver destinatario', breadcrumb: 'Vista' }
    },{
      path: 'destinatario/estudio', component: EstudioComponent,
      data: { loading: true, title: 'Estudio/s', breadcrumb: 'Estudio' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  //  providers: [ProgramaService, TipoRecursoService]
})
export class DestinatarioRoutingModule { }
