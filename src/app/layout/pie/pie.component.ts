import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-pie',
    templateUrl: './pie.component.html',
    styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
    //title = 'app';

    constructor(
        private _router: Router
    ) { }

    ngOnInit() {

    }
}
