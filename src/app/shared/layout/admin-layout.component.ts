import { Component, OnInit } from '@angular/core';
import { TitleService, AuthenticationService } from '../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayoutComponent implements OnInit {
  public title: string;
  constructor(
    private _titleService: TitleService,
    private _auth: AuthenticationService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    this.title = this._titleService.getTitlePage();
    this._titleService.init();
  }


  cerrarSesion(){
    this._auth.logout();
    this._router.navigate(['/login']);
  }
}
