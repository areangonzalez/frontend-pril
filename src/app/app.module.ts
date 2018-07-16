import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDatepickerI18n, NgbDateStruct, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';
/* Routing */
import { AppRoutingModule } from './app-routing.module';
/* layout */
import { CabeceraComponent } from "./layout/cabecera/cabecera.component";
import { PieComponent } from "./layout/pie/pie.component";
/* Shareds */
import { CustomDatepickerI18n } from "./shareds/i18n-values";
/* Modulos */
import { DestinatarioModule } from './components/destinatario/destinatario.module'
import { AmbienteTrabajoModule } from './components/ambiente/ambiente-trabajo.module';
import { AreaEntrenamientoModule } from './components/area/area-entrenamiento.module';

/* Componentes */
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/incio.component';
import { BreadcrumbComponent } from './components/breadcrumbs/breadcrumbs.component';
/* Services */
import { BreadcrumbsService } from "./components/breadcrumbs/breadcrumbs.service";

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PieComponent,
    LoginComponent,
    InicioComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DestinatarioModule,
    AmbienteTrabajoModule,
    AreaEntrenamientoModule,
    NgbCollapseModule,
    NgbModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    BreadcrumbsService,
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
