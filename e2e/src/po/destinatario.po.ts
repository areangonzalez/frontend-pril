import { browser, by, element } from 'protractor';

export class AppDestinatario {
  formDestinatarioComp() {
    return element(by.tagName('datos-destinatario-form'));
  }

  legajo(dato:string) {
    return this.formDestinatarioComp().element(by.id('legajo')).sendKeys(dato);
  }
  experienciaLaaboral(dato:string) {
    return this.formDestinatarioComp().element(by.id('experiencia_laboral')).sendKeys(dato);
  }
  deseoActividad(dato:string) {
    return this.formDestinatarioComp().element(by.id('deseo_actividad')).sendKeys(dato);
  }
  deseoLugarEntrenamiento(dato:string) {
    return this.formDestinatarioComp().element(by.id('deseo_lugar_entrenamiento')).sendKeys(dato);
  }
  conocimientosBasicos(dato:string) {
    return this.formDestinatarioComp().element(by.id('conocimientos_basicos')).sendKeys(dato);
  }
  organismoPril(dato:string) {
    return this.formDestinatarioComp().element(by.id('organismo_pril')).sendKeys(dato);
  }
  fechaPresentacion(dato:string) {
    return this.formDestinatarioComp().element(by.id('fecha_presentacion')).sendKeys(dato);
  }
  bancoNombre(dato:string) {
    return this.formDestinatarioComp().element(by.id('banco_nombre')).sendKeys(dato);
  }
  bancoCbu(dato:string) {
    return this.formDestinatarioComp().element(by.id('banco_cbu')).sendKeys(dato);
  }
  bancoAlias(dato:string) {
    return this.formDestinatarioComp().element(by.id('banco_alias')).sendKeys(dato);
  }
}
