import { by, element, browser } from 'protractor';
import { AppLogin } from './po/login.po';
import { AppCabecera } from './po/cabecera.po';

describe('Test Login', () => {
  let page: AppLogin;
  let cabecera: AppCabecera;

  beforeEach(() => {
    page = new AppLogin();
    cabecera = new AppCabecera();
  });

  it('Muestro titulo de Login', () => {
    page.irAlogin();
    browser.waitForAngular();
    expect(element(by.css("app-login h1")).getText()).toEqual('Iniciar Sesión');
  });

  it('inicio de session', () => {
    page.nombreUsuario('admin');
    page.passUsuario('admins');

    page.btnIngresar().click();
    browser.waitForAngular();

    expect(element(by.tagName('app-inicio')).isPresent()).toBeTruthy();
  });

  it('Cierre de session', () => {
    cabecera.cerrarSesion();
    browser.waitForAngular();

    expect(element(by.css("app-login h1")).getText()).toEqual('Iniciar Sesión');
  });

});
