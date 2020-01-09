import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
//import { DetalleProgramaService } from "../core/services";

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        data: { title: 'Admin' },
        /* resolve: {
          programas: DetalleProgramaService
        } */
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    //providers: [DetalleProgramaService]
})
export class AdminRoutingModule { }
