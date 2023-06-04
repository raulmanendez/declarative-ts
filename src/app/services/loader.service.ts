import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    constructor() { }

    private loaderSubject = new BehaviorSubject(false);

    loaderAction = this.loaderSubject.asObservable();

    startLoading() {
        this.loaderSubject.next(true);
    }
    stopLoading() {
        this.loaderSubject.next(false);
    }

}
