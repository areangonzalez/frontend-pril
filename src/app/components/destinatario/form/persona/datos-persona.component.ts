import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
    selector: 'datos-persona-form',
    templateUrl: './datos-persona.component.html',
    styleUrls: ['./datos-persona.component.css'],
})
export class DatosPersonaComponent implements OnInit {
    @Input("group") public datosPersona: FormGroup;
    
    constructor(){}

    ngOnInit(){
        console.log(this.datosPersona);
    }

}
