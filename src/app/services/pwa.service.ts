import { ApplicationRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwUpdate } from '@angular/service-worker';
import { first, switchMap, Observable, mapTo, timeout, catchError, of, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  constructor(
    private appRef: ApplicationRef,
    private swUpdate: SwUpdate,
) {
    if (this.swUpdate.isEnabled) {
        this.appRef.isStable.pipe(
            first(isStable => isStable === true),
            switchMap(() => this.swUpdate.available),
        ).subscribe(() => {
            this.swUpdate.activateUpdate().then(() => document.location.reload());
        });
    }
}

checkForUpdate(): Observable<boolean> {
    const waitFor = 1000;

    if (this.swUpdate.isEnabled) {
        const available$ = this.swUpdate.available.pipe(
            mapTo(true),
            timeout(waitFor),
            catchError(() => of(false)),
        );

        // return fromPromise(this.swUpdate.checkForUpdate()).pipe(
        //     switchMap(() => available$),
        // );
    }

    return timer(waitFor).pipe(mapTo(false));
}


}
function fromPromise(arg0: Promise<boolean>) {
  throw new Error('Function not implemented.');
}

