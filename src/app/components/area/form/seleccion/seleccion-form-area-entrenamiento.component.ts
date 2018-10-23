import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbsService } from "../../../breadcrumbs/breadcrumbs.service";

@Component({
    selector: 'area-entrenamiento-form-seleccion',
    templateUrl: './seleccion-form-area-entrenamiento.html',
    styleUrls: ['./seleccion-form-area-entrenamiento.css']
})
export class SeleccionFormAreaEntrenamientoComponent implements OnInit {
    page = 1;

    constructor(
        private breadcrumbsService: BreadcrumbsService,
        private _router: Router
    ) {}

    ngOnInit() {
        this.breadcrumbsService.store([
            { label: 'Inicio', url: 'inicio', params: [] },
            { label: 'Área de entrenamiento', url: 'area', params: [] },
            { label: 'Crear', url: 'area/crear/seleccion', params: [] }]);
    }

    public ofertas = [
        { fecha_inicial: "12/07/2018", puesto: "Limpieza", dias_horarios: "Lunes a viernes 06hs a 08hs", ambiente_trabajo: "Cooperativa", id: 1 },
        { fecha_inicial: "15/08/2018", puesto: "Limpieza", dias_horarios: "Lunes a viernes 21hs a 23hs", ambiente_trabajo: "Panadería San Fernando", id: 2 },
        { fecha_inicial: "07/09/2018", puesto: "Cajero", dias_horarios: "Lunes a viernes 08hs a 12hs", ambiente_trabajo: "Panadería San Fernando", id: 3 }
    ];

    public destinatarios = [
        { apellido: 'González', nombre: 'Carlos', direccion: 'alberdi 123', telefono: '2920423000', celular: '2920635572', nro_documento: '27123321', oficio: 'Limpieza', calificacion: '4.5', presentacion: '19/06/2018', id: 1 },
        { apellido: 'Díaz', nombre: 'Emanuel', direccion: 'buenos aires 123', telefono: '2920453111', celular: '2920623384', nro_documento: '32689652', oficio: 'Chofer', calificacion: '3.2', presentacion: '15/10/2018', id: 2 },
        { apellido: 'Carrasco', nombre: 'Pablo', direccion: 'alem 123', telefono: '2920423212', celular: '2920612342', nro_documento: '25546726', oficio: 'Electricista', calificacion: '6.9', presentacion: '10/06/2018', id: 3 },
        { apellido: 'Martinez', nombre: 'Juan', direccion: 'neuquen 123', telefono: '2920423322', celular: '2920682734', nro_documento: '32451223', oficio: 'Limpieza', calificacion: '8.1', presentacion: '20/07/2018', id: 4 },
        { apellido: 'Rodriguez', nombre: 'Maria', direccion: 'guido 123', telefono: '2920423123', celular: '2920632234', nro_documento: '31312322', oficio: 'Panadero', calificacion: '5.3', presentacion: '12/092018', id: 5 }
    ];

    cancelar() {
        this._router.navigate(['area']);
    }

    crearArea(){
        this._router.navigate(['area', 'crear-plan']);
    }
}