import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ConfiguracionParaPaginarService } from 'src/app/core/utils';
import { ConfigurarPagina } from '../../core/models';

@Component({
    selector: 'abm-tabla',
    templateUrl: './abm-tabla.component.html',
    styleUrls: ['./abm-tabla.css'],
    providers: [ConfiguracionParaPaginarService]
})
export class AbmTablaComponent implements OnInit {
  @Input("titulosArray") public titulosArray:any;
  @Input("listado") public listado:any;
  @Input("nombreAbm") public nombreAbm: string;
  @Output("obtenerDatos") public obtenerDatos = new EventEmitter();
  @Output("borrarDato") public borrarDato = new EventEmitter();

  public tituloEditar = 'Editar ';
  public pagina: number = 1;
  public configPaginacion:ConfigurarPagina = new ConfigurarPagina();
  public pageSize = 10;
  public listadoRender: any[] = [];

    constructor(
        private _router: Router, private _configurarPagina: ConfiguracionParaPaginarService
      ) {

    }

    ngOnInit() {
      this.tituloEditar += this.nombreAbm;
      this.paginacion(this.listado, this.pagina, this.pageSize);
    }

    editar(datos:any){
      if (datos !== false){
        this.obtenerDatos.emit(datos);
      }
    }

    borrar(dato:any){
      if (dato !== false){
        this.borrarDato.emit(dato);
      }
    }

    paginacion(listadoArray: any, pagina: number, pagesize:number) {
      let datos = {pagesize: pagesize, page: pagina, total_filtrado: listadoArray.length};
      this.configPaginacion = this._configurarPagina.config(datos, pagina);
      this.listadoRender = this._configurarPagina.paginarListado(pagina, pagesize, listadoArray);
    }

    cambiarCantRegistros(cant:any) {
      this.pageSize = cant.target.value;
      this.paginacion(this.listado, this.pagina, this.pageSize);
    }

    cambiarPagina(pagina:number) {
      this.paginacion(this.listado, pagina, this.pageSize);
    }
}
