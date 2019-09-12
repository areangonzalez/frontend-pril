/**
 * Desarrollo del sistema PRIL de ministerio desarrollo social
 * Arean Xavier González 2018-06-18
 * update 2019-09-12
 * version 1.1
 */
import { Component, OnInit } from '@angular/core';
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { NgbDateARParserFormatter } from "./shared/helpers/ngb-date-ar-parser-formatter";
import 'rxjs/add/operator/map';
import { TitleService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateARParserFormatter }]
})
export class AppComponent implements OnInit {

  constructor(
    private _titleService: TitleService,
  ){}

  ngOnInit(){
    this._titleService.init();
  }

}
