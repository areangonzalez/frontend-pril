import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DestinatarioComponent } from "./destinatario.component";
import { FormDestinatarioComponent } from './form/form-destinatario.component';
import { VistaDestinatarioComponent } from './vista';

import { SexoService, GeneroService, EstadoCivilService, OficioService, DestinatarioService, ProfesionService, NivelEducativoService } from "../core/services";

const routes: Routes = [
    {
      path: '', component: DestinatarioComponent,
      data: { loading: true, title: 'Lista destinatarios', breadcrumb: 'Lista' },
      resolve: { destinatarios: DestinatarioService, oficio: OficioService, profesion: ProfesionService, nivelEducativo: NivelEducativoService }
    },
    {
      path: 'agregar', component: FormDestinatarioComponent,
      data: { loading: true, title: 'Agregar destinatario', breadcrumb: 'Agregar' },
      resolve: { sexo: SexoService, genero: GeneroService, estadoCivil: EstadoCivilService, oficio: OficioService }
    },{
      path: 'vista/:destinatarioid', component: VistaDestinatarioComponent,
      data: { loading: true, title: 'Ver destinatario', breadcrumb: 'Vista' },
      resolve: { destinatario: DestinatarioService }
    },{
      path: 'editar/:destinatarioid', component: FormDestinatarioComponent,
      data: { loading: true, title: 'Editar destinatario', breadcrumb: 'Editar' },
      resolve: { sexo: SexoService, genero: GeneroService, estadoCivil: EstadoCivilService, oficio: OficioService }
    /*} ,{
      path: 'destinatario/estudio', component: EstudioComponent,
      data: { loading: true, title: 'Estudio/s', breadcrumb: 'Estudio' } */
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [SexoService, GeneroService, EstadoCivilService, OficioService, DestinatarioService, ProfesionService, NivelEducativoService]
})
export class DestinatarioRoutingModule { }
