import { browser } from "protractor";
import { AppLogin } from "./po/login.po";
import { AppCabecera } from "./po/cabecera.po";
import { AppPersona } from "./po/persona.po";
import { AppLugar } from "./po/lugar.po";


describe('Crear Destinatario',  () => {
  let login: AppLogin;
  let cabecera: AppCabecera;
  let persona: AppPersona;
  let lugar: AppLugar;
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
    persona = new AppPersona();
    lugar = new AppLugar();
    // redSocial = new AppRedSocialPage();
  });


  it('Ingreso al formulario para agregar un destinatario', () => {

  });

   // Cierre de sesion al finalizar las tareas
   afterAll(() => {
    // let cabecera = new AppCabeceraPage();

    // cabecera.abrirMenu().click()
    // browser.waitForAngular();
    cabecera.cerrarSesion();
    browser.waitForAngular();
  });
});
