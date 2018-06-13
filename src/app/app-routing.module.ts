import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/incio.component';
import { FormDestinatarioComponent } from './components/destinatario/form/form-destinatario.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';
//import {  } from '';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', /* component: LoginComponent */ redirectTo: '/inicio', pathMatch: 'full' },
            { path: 'inicio', component: InicioComponent },
            { path: 'destinatario', component: DestinatarioComponent},
            { path: 'destinatario/agregar', component: FormDestinatarioComponent },
            
            /*{ path: 'inicio/vista-agente/:id', component: VistaAgenteComponent, data: { title: 'Ver Agente', breadcrumb: 'Ver agente' }, canActivate: [AuthGuard] }, */

            // otherside
            { path: '**', redirectTo: '' }
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