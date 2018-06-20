import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
/* Routing */
import { AppRoutingModule } from './app-routing.module';
/* layout */
import { CabeceraComponent } from "./layout/cabecera/cabecera.component";
/* Modulos */
import { DestinatarioModule } from './components/destinatario/destinatario.module'
/* Componentes */
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
    LoginComponent,
    InicioComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DestinatarioModule,
    NgbModule.forRoot()
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    BreadcrumbsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
