import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    LoginComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DestinatarioModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
