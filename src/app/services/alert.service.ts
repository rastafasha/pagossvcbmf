import { Injectable } from '@angular/core';
import { Observable, Subject, interval, take } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from '@app/models/alert';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(title: string, message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Success, title, message }));
    }

    error(title: string, message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Error, title, message }));
    }

    info(title: string, message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Info, title, message }));
    }

    warn(title: string, message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Warning, title, message }));
    }

    // main alert method
    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }



}
