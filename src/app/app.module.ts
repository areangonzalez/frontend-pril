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
import { LoaderComponent } from "./components/loader/loader.component";
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/incio.component';
import { BreadcrumbComponent } from './components/breadcrumbs/breadcrumbs.component';
import { MensajesComponent } from "./components/mensajes/mensajes.component";
/* Services */
import { LoaderService } from "./components/loader/loader.service";
import { JwtService } from "./services/jwt.service";
import { ApiService } from "./services/api.service";
import { BreadcrumbsService } from "./components/breadcrumbs/breadcrumbs.service";
import { DestinatarioService } from "./services/destinatario.service";
import { MensajesService } from "./services/mensajes.service";
import { ProfesionService } from "./services/profesion.service";
import { OficioService } from "./services/oficio.service";
import { SexoService } from "./services/sexo.service";
import { GeneroService } from "./services/genero.service";
import { EstadoCivilService } from "./services/estado-civil.service";
import { LocalidadService } from "./services/localidad.service";
import { NivelEducativoService } from "./services/nivel-educativo.service";
import { PersonaService } from "./services/persona.service";
import { TipoAmbienteTrabajoService } from "./services/tipo-ambiente-trabajo.service";
import { AmbienteTrabajoService } from "./services/ambiente-trabajo.service";
import { OfertaService } from "./services/oferta.service";
import { AreaEntrenamientoService } from "./services/area-entrenamiento.service";

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    CabeceraComponent,
    PieComponent,
    LoginComponent,
    InicioComponent,
    BreadcrumbComponent,
    MensajesComponent
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
    // provider used to create fake backend
    fakeBackendProvider,
    // servicios del sistema
    JwtService,
    ApiService,
    LoaderService,
    BreadcrumbsService,
    DestinatarioService,
    MensajesService,
    ProfesionService,
    OficioService,
    SexoService,
    GeneroService,
    EstadoCivilService,
    LocalidadService,
    NivelEducativoService,
    PersonaService,
    TipoAmbienteTrabajoService,
    AmbienteTrabajoService,
    OfertaService,
    AreaEntrenamientoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
