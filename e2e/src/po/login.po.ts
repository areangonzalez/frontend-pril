import { browser, by, element } from 'protractor';

export class AppLogin {
  irAlogin() {
    return browser.get('/login');
  }

  loginComp() {
    return element(by.tagName("app-login"));
  }

  nombreUsuario(texto:string) {
    return this.loginComp().element(by.id("input_user")).sendKeys(texto);
  }

  passUsuario(texto:string) {
    return this.loginComp().element(by.id("input_password")).sendKeys(texto);
  }

  btnIngresar() {
    return this.loginComp().element(by.css("div.form-group")).element(by.css("button.btn-primary"));
  }
}
