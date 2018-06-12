import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';

@Component({
    selector: 'app-destinatario',
    templateUrl: './destinatario.component.html',
    // styleUrls: ['./lista.component.css']
})
export class DestinatarioComponent {
    //title = 'app';

    private destinatarios = [
        { apellido: 'González', nombre: 'Carlos', direccion: 'alberdi 123', telefono: '2920423000', celular: '2920635572', profesion: '', oficio: '', nivel_educativo: '', presentacion: '19/06/2018', id: 1},
        { apellido: 'Díaz', nombre: 'Emanuel', direccion: 'buenos aires 123', telefono: '2920453111', celular: '2920623384', profesion: '', oficio: '', nivel_educativo: '', presentacion: '15/10/2018', id: 1 },
        {apellido: 'Carrasco', nombre: 'Pablo', direccion: 'alem 123', telefono: '2920423212', celular: '2920612342', profesion: '', oficio: '', nivel_educativo: '', presentacion: '10/06/2018', id: 1 },
        { apellido: 'Martinez', nombre: 'Juan', direccion: 'neuquen 123', telefono: '2920423322', celular: '2920682734', profesion: '', oficio: '', nivel_educativo: '', presentacion: '20/07/2018', id: 1 },
        { apellido: 'Rodriguez', nombre: 'Maria', direccion: 'guido 123', telefono: '2920423123', celular: '2920632234', profesion: '', oficio: '', nivel_educativo: '', presentacion: '12/092018', id: 1 }
    ];
}