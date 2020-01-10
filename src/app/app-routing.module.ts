import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCustomPreloader } from './app-routing-loader';

import { AuthGuard } from './core/guards/auth.guard'
import { AppLayoutComponent } from './shared';
import { AdminLayoutComponent } from "./shared";

const routes: Routes = [
//  { path: 'login', component: LoginComponent },
  {
    path: 'inicio',
    data: { title: 'Inicio', breadcrumb: 'Inicio', preload: true },
    component: AppLayoutComponent,
    children: [
      { path: '',
        canActivate: [AuthGuard],
        loadChildren: './inicio/inicio.module#InicioModule'
      },
      { path: 'destinatario',
        loadChildren: './destinatario/destinatario.module#DestinatarioModule',
        canActivate: [AuthGuard],
        data: { preload: true, title: 'Lista destinatarios', breadcrumb: 'Destinatarios' }
      },
      { path: 'ambiente',
        loadChildren: './ambiente/ambiente-trabajo.module#AmbienteTrabajoModule',
        canActivate: [AuthGuard],
        data: { preload: true, title: 'Lista de ambientes de trabajos', breadcrumb: 'Ambientes de Trabajos' }
      },
      { path: 'area-entrenamiento',
        loadChildren: './area/area-entrenamiento.module#AreaEntrenamientoModule',
        canActivate: [AuthGuard],
        data: { preload: true, title: 'Lista de áreas de entrenamientos', breadcrumb: 'Área de entrenamiento' }
      }
    ]
  },
  {
    path: 'admin', data: { title: "admin" },
    component: AdminLayoutComponent,
    children: [{
      path: '',
      canActivate: [AuthGuard],
      loadChildren: './admin/admin.module#AdminModule'
    }]
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
