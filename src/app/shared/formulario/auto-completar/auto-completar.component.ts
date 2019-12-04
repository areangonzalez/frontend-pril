import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Console } from '@angular/core/src/console';


@Component({
    selector: 'auto-completar',
    templateUrl: './auto-completar.html',
    styles: ['./auto-completar.css']
})
export class AutoCompletarComponent {
    @Input("listado") public listado: any;
    @Input("titulo") public titulo:string;
    @Input("placeHolder") public placeHolder:string;
    @Input("nombreValor") public model:string;
    @Output("seleccionaValor") public seleccionaValor = new EventEmitter();

    @ViewChild('instance') instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();
    /**
     * Busca las coincidencias dentro del listado
     */
    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200),distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;
        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => (term === '' ? this.getListaNombres(this.listado)
               : this.getListaNombres(this.listado).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
    }
    /**
     * Gestiona el listado del auto completar
     * @param listaObject Listado que contiene los elementos a mostrar en el auto completar
     */
    getListaNombres(listaObject) {
        let element = [];
        for (var key in listaObject) {
            element.push(listaObject[key].nombre);
        }
        return element;
    }
    /**
     * Busca el nombre del item seleccionado dentro del listado y devuelve el objeto al componente padre
     * @param valor Item seleccionado por el auto completar
     */
    seleccionaElemento(valor: NgbTypeaheadSelectItemEvent){
        let seleccion: any;
        // busco el elemento en la lista
        for (var key in this.listado) {
            // verifico que exista el elemento
            if (this.listado[key].nombre == valor.item) {
                seleccion = this.listado[key];
            }
        }
        // Reviso si hubo una selección
        if (seleccion != undefined) {
          this.seleccionaValor.emit(seleccion);
        }else{// sino hubo seleccion mando un mensaje de error
          this.seleccionaValor.emit({id:'',nombre:''});
        }
      }
}
