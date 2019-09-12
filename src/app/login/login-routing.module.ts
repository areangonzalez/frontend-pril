import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
//import { DetalleProgramaService } from "../core/services";

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        data: { title: 'Login' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
