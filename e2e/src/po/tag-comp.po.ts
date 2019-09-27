import { browser, by, element, protractor } from 'protractor';

export class AppTagComp {
  /**
   * componente del formulario de estudio
   */
  formTagComp() {
    return element(by.tagName('tag-component'));
  }

  agregarTag(dato:string) {
    return this.formTagComp().element(by.tagName('auto-completar')).element(by.tagName('input')).sendKeys(dato);
  }

  seleccionarTag() {
    return this.formTagComp().element(by.tagName('auto-completar')).element(by.tagName('input')).sendKeys(protractor.Key.ENTER);
  }

  listaTagComp() {
    return element(by.tagName("ul"));
  }
}
