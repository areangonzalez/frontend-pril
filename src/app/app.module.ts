import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDatepickerI18n, NgbDateStruct, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SelfBuildingSquareSpinnerModule } from "angular-epic-spinners";

/* Routing */
import { AppRoutingModule } from './app-routing.module';

// used to create fake backend
import { fakeBackendProvider } from './shared/helpers/fake-backend';

/* Modulos */
import { CoreModule } from "./core/core.module";
import {
  AppLayoutComponent,
  AdminLayoutComponent,
  MensajesComponent,
  BreadcrumbComponent, BreadcrumbsService,
  CustomDatepickerI18n,
  LoaderComponent,
  SharedModule
} from "./shared";

import { AppComponent } from './app.component';
import { JwtInterceptor } from "./shared/helpers/jwt.interceptor";
import { ErrorInterceptor } from './shared/helpers/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AdminLayoutComponent,
    LoaderComponent,
    BreadcrumbComponent,
    MensajesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SelfBuildingSquareSpinnerModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbModule.forRoot(),
    CoreModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //{ provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    Title,
    BreadcrumbsService,

    // provider used to create fake backend
    fakeBackendProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
