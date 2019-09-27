import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class AppEstudio {
  /**
   * componente del formulario de estudio
   */
  formEstudioComp() {
    return element(by.tagName('estudio-form'));
  }

  nivelEducativo(opcion: string) {
    return this.formEstudioComp().element(by.id('nivel_educativo')).element(by.cssContainingText('option', opcion)).click();
  }
  estudiCompleto() { // hacer click para checkear
    return this.formEstudioComp().element(by.id('estudio_completo'));
  }
  estudioEnCurso() { // hacer click para checkear
    return this.formEstudioComp().element(by.id('estudio_en_curso'));
  }
  titulo(dato:string) {
    return this.formEstudioComp().element(by.id('titulo')).sendKeys(dato);
  }
  AnioEgreso(opcion: string) {
    return this.formEstudioComp().element(by.id('anio_egreso')).element(by.cssContainingText('option', opcion)).click();
  }
  profesion(dato:string) {
    return this.formEstudioComp().element(by.tagName('auto-completar')).element(by.tagName('input')).sendKeys(dato);
  }

  seleccionarProfesion() {
    return this.formEstudioComp().element(by.tagName('auto-completar')).element(by.tagName('input')).sendKeys(protractor.Key.ENTER);
  }

  listaEstudioComp() {
    return element(by.tagName("lista-estudio"));
  }

  modalEstudioComp() {
    return this.listaEstudioComp().element(by.tagName("modal-estudio"));
  }

  agregarEstudio() {
    return element(by.id('agregar-estudio'));
  }
}
