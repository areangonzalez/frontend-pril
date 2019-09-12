import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDatepickerI18n, NgbDateStruct, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

// used to create fake backend
import { fakeBackendProvider } from './shared/helpers/fake-backend';
/* import { CabeceraComponent } from "./shared/layout/cabecera/cabecera.component";
import { PieComponent } from "./shared/layout/pie/pie.component"; */

/* Modulos */
import { CoreModule } from "./core/core.module";
import {
  MensajesComponent,
  BreadcrumbComponent, BreadcrumbsService,
  CustomDatepickerI18n,
  LoaderComponent,
  SharedModule
} from "./shared";
/* import { LoaderComponent } from "./components/loader/loader.component";
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/incio.component';
import { BreadcrumbComponent } from './components/breadcrumbs/breadcrumbs.component';
import { MensajesComponent } from "./components/mensajes/mensajes.component";
 */

import { AppComponent } from './app.component';
// import { HttpClient } from 'selenium-webdriver/http';
import { JwtInterceptor } from "./shared/helpers/jwt.interceptor";
import { ErrorInterceptor } from './shared/helpers/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    BreadcrumbComponent,
    MensajesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbModule.forRoot(),
    CoreModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
