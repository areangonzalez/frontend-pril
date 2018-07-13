import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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


import { AuthGuard } from './guards/auth.guard'

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent },
            { path: 'inicio', component: InicioComponent, data: { title: 'Bienvenido a PRIL', }, canActivate: [AuthGuard] },
            
            { path: 'destinatario', component: DestinatarioComponent, data: { title: 'Lista destinatarios', }, canActivate: [AuthGuard] },
            { path: 'destinatario/agregar', component: FormDestinatarioComponent, data: { title: 'Agregar destinatario', }, canActivate: [AuthGuard]  },
            { path: 'destinatario/vista', component: VistaDestinatarioComponent, data: { title: 'Ver destinatario', }, canActivate: [AuthGuard] },
            
            { path: 'ambiente', component: AmbienteTrabajoComponent, data: { title: 'Lista ambiente de Trabajo' }, canActivate: [AuthGuard] },
            { path: 'ambiente/vista', component: VistaAmbienteTrabajoComponent, data: { title: 'Ver ambiente de Trabajo' }, canActivate: [AuthGuard] },
            { path: 'ambiente/agregar', component: FormAmbienteTrabajoComponent, data: { title: 'Agregar ambiente de Trabajo' }, canActivate: [AuthGuard] },
            { path: 'ambiente/oferta/agregar', component: OfertaComponent, data: { title: 'Agregar oferta' }, canActivate: [AuthGuard] },

            { path: 'area', component: AreaEntrenamientoComponent, data: { title: 'Lista área de entrenamiento' }, canActivate: [AuthGuard] },
            { path: 'area/crear-seleccion', component: SeleccionFormAreaEntrenamientoComponent, data: { title: 'Crear área de entrenamiento' }, canActivate: [AuthGuard] },
            { path: 'area/crear-plan', component: PlanFormAreaEntrenamientoComponent, data: { title: 'Crear área de entrenamiento' }, canActivate: [AuthGuard] },
            { path: 'area/vista', component: VistaAreaEntrenamientoComponent, data: { title: 'Ver área de entrenamiento' }, canActivate: [AuthGuard] },
            
            
            
            /*{ path: 'inicio/vista-agente/:id', component: VistaAgenteComponent, data: { title: 'Ver Agente', breadcrumb: 'Ver agente' }, canActivate: [AuthGuard] }, */

            // otherside
            { path: '**', redirectTo: 'login', pathMatch: 'full' }
        ]/* , { preloadingStrategy: AppCustomPreloader } */)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        /* AuthGuard,
        AppCustomPreloader */
    ]
})
export class AppRoutingModule { }