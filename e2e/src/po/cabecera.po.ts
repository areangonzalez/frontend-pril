import { browser, by, element } from 'protractor';

export class AppCabecera {
  cabeceraComp() {
    return element(by.tagName('app-cabecera'));
  }

  /* abrirMenu() {
    return this.cabeceraComp().element(by.id('dropdownBasic1'));
  }

  cerrarSesion() {
    return this.cabeceraComp().element(by.css('.dropdown-item'));
  } */

  cerrarSesion() {
    return this.cabeceraComp().element(by.id("navbarCollapse")).all(by.tagName("ul")).then(function(lista) {
      lista[1].element(by.css("li a")).click();
    });
  }
}


/*
  Referencia para usar all

buscadorComp.element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(filas) {
  // selecciono la persona
  filas[0].click();
}); */
