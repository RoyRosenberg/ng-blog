import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  into(message: string) {
    this.snackBar.open(message, 'Dismiss', { panelClass: 'alert-info', duration: 2000 });
  }

  success(message: string) {
    this.snackBar.open(`✅ ${message}`, 'Dismiss', { panelClass: 'alert-success', duration: 2000 });
  }

  warn(message: string) {
    this.snackBar.open(`⚠ ${message}`, 'Dismiss', { panelClass: 'alert-warn', duration: 2000 });
  }

  error(message: string) {
    this.snackBar.open(`⛔ ${message}`, 'Dismiss', { panelClass: 'alert-error', duration: 2000 });
  }

}
