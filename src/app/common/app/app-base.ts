import { Location } from '@angular/common';

export class AppBase {

    constructor(protected _location: Location) {}

    goBack() {
        this._location.back();    
    }

    goFoward() {
        this._location.forward();
    }
}