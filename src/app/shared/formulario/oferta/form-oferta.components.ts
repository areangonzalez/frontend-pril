import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'form-oferta',
    templateUrl: './form-oferta.html',
    styleUrls: ['./form-oferta.css']
})
export class FormOfertaComponent implements OnInit {
    @Input("group") public datosOferta: FormGroup;
    @Input("submitted") public submitted: boolean;

    constructor() { }

    ngOnInit() {}

    get oferta() { return this.datosOferta.controls; }

}
