/**
 * Desarrollo del sistema PRIL de ministerio desarrollo social
 * Arean Xavier González 2018-06-18
 * version 1.0
 */
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from "rxjs";
import { NgbDatepickerConfig, NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { NgbDateARParserFormatter } from "./shared/helpers/ngb-date-ar-parser-formatter";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateARParserFormatter }]
})
export class AppComponent implements OnInit {

  constructor(
    private _router: Router,
    private _title: Title,
  ){
    this.title = _router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.getDeepestTitle(_router.routerState.snapshot.root));
  }

  ngOnInit(){
    this.estoyLogueado();
  }

  title: Observable<string>;

  private getDeepestTitle(routeSnapshot: ActivatedRouteSnapshot) {
    var title = routeSnapshot.data ? routeSnapshot.data['title'] : '';
    if (routeSnapshot.firstChild) {
      title = this.getDeepestTitle(routeSnapshot.firstChild) || title;
      this._title.setTitle(title);
    }
    return title;
  }

  estoyLogueado(){
    return (localStorage.getItem('currentUser')) ? true : false;
  }
}
