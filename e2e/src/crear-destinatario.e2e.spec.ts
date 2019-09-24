import { browser } from "protractor";
import { AppLogin } from "./po/login.po";


describe('Crear prestación',  () => {
  let login: AppLogin;
  //let cabecera: AppCabeceraPage;
  // let prestacion: AppRecursoPage;
  // let contacto: AppContactoPage;
  // let redSocial: AppRedSocialPage;
  // Inicio de session para realizar tareas de testing
  beforeAll(() => {
    login = new AppLogin();

    browser.get('/login');
    // Agrego un usuario valido
    login.nombreUsuario("admin");
    login.passUsuario("admins");

    login.btnIngresar().click()

    browser.waitForAngular();
  });

  beforeEach(() => {
    // prestacion = new AppRecursoPage();
    // contacto = new AppContactoPage();
    // redSocial = new AppRedSocialPage();
  });

   // Cierre de sesion al finalizar las tareas
   afterAll(() => {
    // let cabecera = new AppCabeceraPage();

    // cabecera.abrirMenu().click()
    // browser.waitForAngular();
    // cabecera.cerrarSesion().click();
    // browser.waitForAngular();
  });
});
