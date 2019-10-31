import { Component, OnInit, Input } from '@angular/core';
import { Oferta, Lugar } from 'src/app/core/models';

@Component({
    selector: 'oferta-vista',
    templateUrl: './vista-oferta.html',
    styleUrls: ['./vista-oferta.css']
})
export class VistaOfertaComponent implements OnInit {
    @Input("oferta") public oferta: any;

    constructor() { }

    ngOnInit(): void {}
}
