import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from "./guards/auth.guard";

import {
  AmbienteTrabajoService,
  ApiService,
  AreaEntrenamientoService,
  AuthenticationService,
  JwtService,
  DestinatarioService,
  EstadoCivilService,
  GeneroService,
  LocalidadService,
  MensajesService,
  NivelEducativoService,
  OfertaService,
  OficioService,
  PlanService,
  ProfesionService,
  SexoService,
  TipoAmbienteTrabajoService,
  UserService
} from './services';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    AuthGuard,
    AmbienteTrabajoService,
    ApiService,
    AreaEntrenamientoService,
    AuthenticationService,
    DestinatarioService,
    EstadoCivilService,
    GeneroService,
    JwtService,
    LocalidadService,
    MensajesService,
    NivelEducativoService,
    OfertaService,
    OficioService,
    PlanService,
    ProfesionService,
    SexoService,
    TipoAmbienteTrabajoService,
    UserService
  ],
  declarations: []
})
export class CoreModule { }
