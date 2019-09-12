import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCustomPreloader } from './app-routing-loader';

import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/incio.component';
import { AmbienteTrabajoComponent } from './ambiente/ambiente-trabajo.component';
import { VistaAmbienteTrabajoComponent } from './ambiente/vista/vista-ambiente-trabajo.component';
import { AreaEntrenamientoComponent } from './area/area-entrenamiento.component';
import { FormAmbienteTrabajoComponent } from "./ambiente/form/form-ambiente-trabajo.component";
import { OfertaComponent } from "./ambiente/oferta/oferta.component";
import { SeleccionFormAreaEntrenamientoComponent } from "./area/form/seleccion/seleccion-form-area-entrenamiento.component";
import { PlanFormAreaEntrenamientoComponent } from "./area/form/plan/plan-form-area-entrenamiento.component";
import { VistaAreaEntrenamientoComponent } from "./area/vista/vista-area-entrenamiento.component";


import { AuthGuard } from './core/guards/auth.guard'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'inicio',
    data: { title: 'Bienvenido al Programa Rionegrino de Inclusión laboral', breadcrumb: 'Inicio', loading: true },
    component: InicioComponent,
    children: [
      { path: '',
        canActivate: [AuthGuard],
        loadChildren: './inicio/inicio.module#InicioModule'
      },
      { path: 'destinatario',
        loadChildren: './destinatario/destinatario.module#DestinatarioModule',
        canActivate: [AuthGuard],
        //data: { loading: true, title: 'Lista destinatarios', breadcrumb: 'Destinatario' },
      },
      { path: 'ambiente',
        loadChildren: './ambiente/ambiente-trabajo.module#AmbienteTrabajoModule',
        canActivate: [AuthGuard]
      },
      { path: 'area-entrenamiento',
        loadChildren: './area/area-entrenamiento.module#AreaEntrenamientoModule',
        canActivate: [AuthGuard]

      }
    ]
  },
            /*{ path: 'inicio/vista-agente/:id', component: VistaAgenteComponent, data: { title: 'Ver Agente', breadcrumb: 'Ver agente' }, canActivate: [AuthGuard] }, */

            // otherside
            { path: '**', redirectTo: 'login', pathMatch: 'full' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes,
        {
          preloadingStrategy: AppCustomPreloader
        })],
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
