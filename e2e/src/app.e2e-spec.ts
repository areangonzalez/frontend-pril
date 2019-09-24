import { by, element, browser } from 'protractor';
import { AppLogin } from './po/login.po';

describe('workspace-project App', () => {
  let page: AppLogin;

  beforeEach(() => {
    page = new AppLogin();
  });

  it('Muestro titulo de Login', () => {
    page.irAlogin();
    browser.waitForAngular();
    expect(element(by.css("app-login h1")).getText()).toEqual('Iniciar Sesión');
  });
});
