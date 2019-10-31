import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { MensajesService } from "../../core/services/mensajes.service";
import { OfertaService } from "../../core/services/oferta.service";

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
