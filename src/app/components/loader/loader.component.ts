import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { debounce } from 'rxjs/operators';
import { of, timer } from 'rxjs';

import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

import { LoaderService } from './loader.service';
import { LoaderState } from './loader';

@Component({
    selector: 'angular-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.css']
})
export class LoaderComponent implements OnInit {

    show:boolean = false;

    private subscription: Subscription;

    constructor(
        private loaderService: LoaderService,
        private _cd: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .pipe(debounce(() => timer(300)))
            .subscribe((state: LoaderState) => {
                console.log(state.show);
                this.show = state.show;
            });
    }


    /* ngAfterViewChecked(): void {
        this.show = false;
        this._cd.detectChanges();
    } */

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
