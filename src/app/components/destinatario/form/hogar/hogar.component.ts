import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
    selector: 'hogar-form',
    templateUrl: './hogar.html',
    styleUrls: ['./hogar.css']
})
export class HogarComponent implements OnInit {
    @Input("group") public datosHogar: FormGroup;
    @Input("submitted") public submitted;

    public cuil_medio = '';
    constructor() { }

    ngOnInit() {
    }

    get hogar() { return this.datosHogar.controls; }
}
