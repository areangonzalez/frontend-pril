import { browser, by, element } from 'protractor';

export class AppBuscarDestinatario {

  buscarComp() {
    return element(by.tagName("destinatario-busqueda"));
  }

  buscarInput(texto:string) {
    return this.buscarComp().element(by.css("input.form-control")).sendKeys(texto);
  }

  btnAgregarDestinatario() {
    return this.buscarComp().element(by.css("a.btn-success"));
  }

  btnBuscar() {
    return this.buscarComp().element(by.css("button.btn-prymary"));
  }
}
