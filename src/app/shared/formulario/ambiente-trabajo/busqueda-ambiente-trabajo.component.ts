import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilService } from 'src/app/core/utils';


@Component({
    selector: 'ambiente-trabajo-busqueda',
    templateUrl: './busqueda-ambiente-trabajo.html',
    styleUrls: ['./busqueda-ambiente-trabajo.css'],
    providers: [UtilService]
})
export class BusquedaAmbienteTrabajoComponent implements OnInit{
    //title = 'app';
    public tipo_ambiente_trabajo_lista:any;
    public isCollapsed = true;
    public busquedaForm : FormGroup;

    constructor(
        private _utilService: UtilService,
        private _router: Router,
        private _fb: FormBuilder,
        private _route: ActivatedRoute
    ) { 
       this.busquedaForm = _fb.group({
           global_param: '',
           tipo_ambiente_trabajoid: '',
           fechaDesde : '',
           fecha_desde : '',
           fechaHasta : '',
           fecha_hasta : ''
       }) 
    }

    ngOnInit(){
        this.tipo_ambiente_trabajo_lista = this._route.snapshot.data['tipoAmbienteTrabajoLista'];
    }


    
}