import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';


@Component({
    selector: 'auto-completar',
    templateUrl: './auto-completar.html',
    styles: ['./auto-completar.css']
})
export class AutoCompletarComponent {
    @Input("listado") listado;
    @Input("submitted") submitted: boolean;
    @Input("mensaje") mensaje: string;
    @Input("titulo") titulo:string;
    @Input("placeHolder") placeHolder:string;
    @Input("nombreValor") model:string;
    @Output("seleccionaValor") seleccionaValor = new EventEmitter();
    //public model: string = (this.nombreValor != '')?this.nombreValor:'';
    public validacion:boolean = true;
    //public mensaje:string;

    @ViewChild('instance') instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;
        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => (term === '' ? this.getListaNombres(this.listado)
                : this.getListaNombres(this.listado).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
    }

    getListaNombres(listaObject) {
        let element = [];
        for (var key in listaObject) {
            element.push(listaObject[key].nombre);
        }
        return element;
    }

    seleccionaElemento(listado, valor){
        let seleccion: any;
        // busco el elemento en la lista
        for (var key in listado) {
            // verifico que exista el elemento
            if (listado[key].nombre == valor) {
                seleccion = listado[key];
            }
        }
        // Reviso si hubo una selección
        if (seleccion != undefined) {
            this.validacion = false;
            this.seleccionaValor.emit(seleccion);
        }else{// sino hubo seleccion mando un mensaje de error
            this.validacion = true;
            this.submitted = true;
            this.mensaje = "Por favor seleccione un valor del listado.";
        } 


    }

}