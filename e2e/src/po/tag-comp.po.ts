import { browser, by, element } from 'protractor';

export class AppTagComp {
  /**
   * componente del formulario de estudio
   */
  formTagComp() {
    return element(by.tagName('tag-component'));
  }

  agregarTag(dato:string) {
    return this.formTagComp().element(by.id('auto-completar')).element(by.tagName('input')).sendKeys(dato);
  }

  listaTagComp() {
    element(by.tagName("ul"));
  }
}
