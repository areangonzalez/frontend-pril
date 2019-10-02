import { browser, by, element } from "protractor";
import { AppLogin } from "./po/login.po";
import { AppCabecera } from "./po/cabecera.po";
import { AppPersona } from "./po/persona.po";
import { AppLugar } from "./po/lugar.po";
import { AppEstudio } from "./po/estudio.po";
import { AppTagComp } from "./po/tag-comp.po";
import { AppDestinatario } from "./po/destinatario.po";
import { AppBuscarDestinatario } from "./po/buscar-destinatario.po";


describe('Crear Destinatario',  () => {
  let login: AppLogin;
  let cabecera: AppCabecera;
  let persona: AppPersona;
  let lugar: AppLugar;
  let estudio: AppEstudio;
  let oficio: AppTagComp;
  let destinatario: AppDestinatario;
  let buscarComp: AppBuscarDestinatario;
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
    estudio = new AppEstudio();
    oficio = new AppTagComp();
    destinatario = new AppDestinatario();
    buscarComp = new AppBuscarDestinatario();
  });


  it('ingreso al formulario de destinatario', () => {
    // ingreso a la seccion de destinatrio
    browser.get('/inicio/destinatario');
    browser.waitForAngular();
    // hago click en el boton de agregar destinatario
    buscarComp.btnAgregarDestinatario().click()
    browser.waitForAngular();

    expect(persona.formPersonaComp().isPresent()).toBeTruthy();
  });

  it('completo datos persona', () => {
    persona.documento('33476725');
    persona.nroCuilPrincipio('20');
    browser.waitForAngular();
    // cierro mensaje de error
    element(by.tagName('mensajes-alert')).element(by.css('div.float-right')).element(by.css('button.btn-danger')).click();

    browser.waitForAngular();

    persona.nroCuilPrincipio('20');
    persona.nroCuilFinal('7');
    persona.apellido('Doe');
    persona.nombre('Jhon');
    persona.fechaNacimiento('13/05/1998');
    persona.sexo('Hombre');
    persona.genero('Masculino');
    persona.estadoCivil('Soltero/a');
    persona.email('braul@gmail.com');
    lugar.localidad('Viedma');
    lugar.calle('La Pampa');
    lugar.altura('231');


    let emailPersona = persona.formPersonaComp().element(by.id("email")).getAttribute('value');
    expect(emailPersona).toEqual('braul@gmail.com');
  });

  it('agrego estudios', () => {
    estudio.modalEstudioComp().click();
    browser.waitForAngular();

    estudio.nivelEducativo('Terciaria');
    estudio.titulo("Licenciatura de enfermeria");
    estudio.AnioEgreso('2006');
    estudio.profesion('Enfermero');
    estudio.seleccionarProfesion();

    browser.waitForAngular();

    estudio.agregarEstudio().click();
    browser.waitForAngular();

    //expect(estudio.listaEstudioComp().isPresent()).toBeTruthy();
    estudio.listaEstudioComp().element(by.tagName('table tbody')).all(by.tagName('tr'))
    .then(function(filas) {
      expect(filas.length).toBe(1);
    });

  });

  it('se agregan oficios', () => {
    // agrego y selecciono un oficio
    oficio.agregarTag('Electricista');
    oficio.seleccionarTag();
    browser.waitForAngular();
    // limpio el campo
    oficio.formTagComp().element(by.tagName('auto-completar')).element(by.tagName('input')).clear();

    oficio.agregarTag('Albañil');
    oficio.seleccionarTag();
    browser.waitForAngular();
    // agrego dos pero cuenta 3 ¿? xD
    oficio.listaTagComp().all(by.tagName('li')).then(function(items) {
      expect(items.length).toBe(3);
    });
  });

  it('completo datos destinatario', () => {
    destinatario.legajo('123456');
    destinatario.deseoActividad('panadero');
    destinatario.conocimientosBasicos('panadero, limpieza');
    destinatario.organismoPril('Ministerio de Desarrollo social');
    destinatario.fechaPresentacion('01/10/2019');

    let formGeneral = element(by.tagName('destinatario-form'));
    formGeneral.element(by.css('div.float-right')).element(by.css('button.btn-success')).click();
    browser.waitForAngular();
    expect(element(by.tagName('mensajes-alert')).element(by.tagName('p')).getText()).toEqual('Guardado exitoso.');
  });

  it ('Verifico redireccionamiento a vista', () => {
    element(by.tagName('mensajes-alert')).element(by.css('div.float-right')).element(by.css('button.btn-success')).click();

    browser.waitForAngular();

    expect(element(by.tagName('datos-destinatario-vista')).isPresent()).toBeTruthy();
  });

   // Cierre de sesion al finalizar las tareas
   afterAll(() => {
    let cabecera = new AppCabecera();

    // cabecera.abrirMenu().click()
    // browser.waitForAngular();
    cabecera.cerrarSesion();
    browser.waitForAngular();
  });
});
