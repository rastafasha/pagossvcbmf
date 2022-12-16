import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from '@app/models/alert';
import { AlertService } from '@app/services/alert.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  id = 'default-alert';
    fade = true;

    alerts: Alert[] = [];
    alertSubscription: Subscription = new Subscription();
    routeSubscription: Subscription =  new Subscription();


    //alert notification
    options = {
        autoClose: false,
        keepAfterRouteChange: false
    };

    constructor(private router: Router, private alertService: AlertService) { }

    ngOnInit() {
      this.iniciarAlert();
    }

    iniciarAlert(){
      // subscribe to new alert notifications
      this.alertSubscription = this.alertService.onAlert(this.id)
          .subscribe(alert => {
              // clear alerts when an empty alert is received
              if (!alert.message) {
                  // filter out alerts without 'keepAfterRouteChange' flag
                  this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

                  // remove 'keepAfterRouteChange' flag on the rest
                 //this.alerts.forEach(x => delete x.keepAfterRouteChange);
                  return;
              }

              // add alert to array
              this.alerts.push(alert);

              // auto close alert if required
              if (alert.autoClose) {
                  setTimeout(() => this.removeAlert(alert), 3000);
              }
         });

      // clear alerts on location change
      this.routeSubscription = this.router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              //this.alertService.clear(this.id);
          }
      });

      this.alertService.info("Nuevo Mensaje","Se ha iniciado el sistema de notificaciones");
  }

    ngOnDestroy() {
        // unsubscribe to avoid memory leaks
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    removeAlert(alert: Alert) {
        // check if already removed to prevent error on auto close
        if (!this.alerts.includes(alert)) return;

        if (this.fade) {
            // fade out alert
            alert.fade = true;

            // remove alert after faded out
            setTimeout(() => {
                this.alerts = this.alerts.filter(x => x !== alert);
            }, 250);
        } else {
            // remove alert
            this.alerts = this.alerts.filter(x => x !== alert);
        }
    }

    cssClass(alert: Alert) {
        if (!alert) return;

        const classes = [];

        const alertTypeClass = {
            [AlertType.Success]: 'text-success',
            [AlertType.Error]: 'text-danger',
            [AlertType.Info]: 'text-info',
            [AlertType.Warning]: 'text-warning'
        }

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }

    cssIconClass(alert: Alert){
        const alertTypeClass = {
            [AlertType.Success]: 'bi bi-check-circle text-success',
            [AlertType.Error]: 'bi bi-x-circle text-danger',
            [AlertType.Info]: 'bi bi-info-circle text-primary',
            [AlertType.Warning]: 'bi bi-info-circle text-warning'
        }

        return alertTypeClass[alert.type];
    }

    count(){
        return this.alerts.length;
    }

}
