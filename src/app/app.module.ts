import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
/* Routing */
import { AppRoutingModule } from './app-routing.module';
/* layout */
import { CabeceraComponent } from "./layout/cabecera/cabecera.component";
import { PieComponent } from "./layout/pie/pie.component";
/* Shareds */
import { CustomDatepickerI18n } from "./shareds/i18n-values";
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
    PieComponent,
    LoginComponent,
    InicioComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DestinatarioModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: NgbDatepickerI18n,
      useClass: CustomDatepickerI18n
    },
    BreadcrumbsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
