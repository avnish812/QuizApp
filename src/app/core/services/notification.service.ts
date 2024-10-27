import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private snack: MatSnackBar) { }

    showError(message: string): void {
        this.snack.open(message, 'Close', {
            duration: 5000,
            panelClass: ['Error-snackbar']
        })
    };
    showSuccess(message: string): void {
        this.snack.open(message, 'Close', {
            duration: 5000,
            panelClass: ['Error-snackbar']
        })
    }
}