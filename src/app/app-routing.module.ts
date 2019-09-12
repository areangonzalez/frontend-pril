import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCustomPreloader } from './app-routing-loader';

import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/incio.component';


import { AuthGuard } from './core/guards/auth.guard'
import { AppLayoutComponent } from './shared';

const routes: Routes = [
//  { path: 'login', component: LoginComponent },
  {
    path: 'inicio',
    data: { title: 'Bienvenido al Programa Rionegrino de Inclusión laboral', breadcrumb: 'Inicio', loading: true },
    component: AppLayoutComponent,
    children: [
      { path: '',
        canActivate: [AuthGuard],
        loadChildren: './inicio/inicio.module#InicioModule'
      },
      /* { path: 'destinatario',
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

      } */
    ]
  },
  { path: 'login', data: { title: "Iniciar sesión" }, loadChildren: './login/login.module#LoginModule' },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
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
