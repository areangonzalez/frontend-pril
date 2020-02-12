import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  UserService,
  TitleService,
  LoaderService,
  RolService,
  PermisoService
} from './services';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
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
    UserService,
    TitleService,
    LoaderService,
    RolService,
    PermisoService
  ],
  declarations: []
})
export class CoreModule { }
