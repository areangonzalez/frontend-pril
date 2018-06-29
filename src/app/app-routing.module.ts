import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/incio.component';
import { FormDestinatarioComponent } from './components/destinatario/form/form-destinatario.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';

import { AuthGuard } from './guards/auth.guard'

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent },
            { path: 'inicio', component: InicioComponent, data: { title: 'Bienvenido a PRIL', breadcrumb: 'Inicio' }, canActivate: [AuthGuard] },
            { path: 'destinatario', component: DestinatarioComponent, data: { title: 'Lista destinatarios', breadcrumb: 'Destinatario' }, canActivate: [AuthGuard] },
            { path: 'destinatario/agregar', component: FormDestinatarioComponent, data: { title: 'Agregar destinatario', breadcrumb: 'Agregar' }, canActivate: [AuthGuard]  },
            
            /*{ path: 'inicio/vista-agente/:id', component: VistaAgenteComponent, data: { title: 'Ver Agente', breadcrumb: 'Ver agente' }, canActivate: [AuthGuard] }, */

            // otherside
            { path: '**', redirectTo: '', pathMatch: 'full' }
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