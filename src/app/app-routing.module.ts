import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppCustomPreloader } from './app-routing-loader';

import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/incio.component';
import { FormDestinatarioComponent } from './components/destinatario/form/form-destinatario.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';
import { VistaDestinatarioComponent } from "./components/destinatario/vista/vista-destinatario.component";
import { AmbienteTrabajoComponent } from './components/ambiente/ambiente-trabajo.component';
import { VistaAmbienteTrabajoComponent } from './components/ambiente/vista/vista-ambiente-trabajo.component';
import { AreaEntrenamientoComponent } from './components/area/area-entrenamiento.component';
import { FormAmbienteTrabajoComponent } from "./components/ambiente/form/form-ambiente-trabajo.component";
import { OfertaComponent } from "./components/ambiente/oferta/oferta.component";
import { SeleccionFormAreaEntrenamientoComponent } from "./components/area/form/seleccion/seleccion-form-area-entrenamiento.component";
import { PlanFormAreaEntrenamientoComponent } from "./components/area/form/plan/plan-form-area-entrenamiento.component";
import { VistaAreaEntrenamientoComponent } from "./components/area/vista/vista-area-entrenamiento.component";
import { EstudioComponent } from "./components/destinatario/form/estudio/estudio.component";


import { AuthGuard } from './guards/auth.guard'

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent },
            { path: 'inicio', component: InicioComponent, data: { title: 'Bienvenido al Programa Rionegrino de Inclusión laboral', breadcrumb: 'Inicio' }, canActivate: [AuthGuard] },

            { path: 'destinatario', component: DestinatarioComponent, data: { title: 'Lista destinatarios', breadcrumb: 'Destinatario' }, canActivate: [AuthGuard] },
            { path: 'destinatario/agregar', component: FormDestinatarioComponent, data: { title: 'Agregar destinatario', breadcrumb: 'Agregar' }, canActivate: [AuthGuard]  },
            { path: 'destinatario/editar/:id', component: FormDestinatarioComponent, data: { title: 'Editar destinatario', breadcrumb: 'Editar' }, canActivate: [AuthGuard] },
            { path: 'destinatario/vista/:id', component: VistaDestinatarioComponent, data: { title: 'Ver destinatario', breadcrumb: 'Vista' }, canActivate: [AuthGuard] },
            { path: 'destinatario/estudio', component: EstudioComponent, data: { title: 'Estudio/s', breadcrumb: 'Estudio' }, canActivate: [AuthGuard] },

            { path: 'ambiente', component: AmbienteTrabajoComponent, data: { title: 'Lista ambiente de Trabajo' }, canActivate: [AuthGuard]},
            { path: 'ambiente/vista/:id', component: VistaAmbienteTrabajoComponent, data: { title: 'Ver ambiente de Trabajo' }, canActivate: [AuthGuard] },
            { path: 'ambiente/agregar', component: FormAmbienteTrabajoComponent, data: { title: 'Agregar ambiente de Trabajo' }, canActivate: [AuthGuard] },
            { path: 'ambiente/editar/:id', component: FormAmbienteTrabajoComponent, data: { title: 'Editar ambiente de Trabajo' }, canActivate: [AuthGuard] },
            { path: 'ambiente/:id/ofertas', component: OfertaComponent, data: { title: 'Ofertas' }, canActivate: [AuthGuard] },

            { path: 'area-entrenamiento', component: AreaEntrenamientoComponent, data: { title: 'Lista área de entrenamiento' }, canActivate: [AuthGuard] },
            { path: 'area-entrenamiento/crear-seleccion', component: SeleccionFormAreaEntrenamientoComponent, data: { preload: true, title: 'Crear área de entrenamiento' }, canActivate: [AuthGuard] },
            { path: 'area-entrenamiento/crear-plan/:destinatarioid/:ofertaid', component: PlanFormAreaEntrenamientoComponent, data: { preload: true, title: 'Crear área de entrenamiento' }, canActivate: [AuthGuard] },
            { path: 'area-entrenamiento/vista', component: VistaAreaEntrenamientoComponent, data: { title: 'Ver área de entrenamiento' }, canActivate: [AuthGuard] },



            /*{ path: 'inicio/vista-agente/:id', component: VistaAgenteComponent, data: { title: 'Ver Agente', breadcrumb: 'Ver agente' }, canActivate: [AuthGuard] }, */

            // otherside
            { path: '**', redirectTo: 'login', pathMatch: 'full' }
        ], { preloadingStrategy: AppCustomPreloader } )
    ],
    exports: [
        RouterModule
    ],
    providers: [
      AppCustomPreloader
        /* AuthGuard,
        AppCustomPreloader */
    ]
})
export class AppRoutingModule { }
