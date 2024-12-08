import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toastComponent: any;

  registerToastComponent(toastComponent: any) {
    this.toastComponent = toastComponent;
  }

  constructor() { }

  showMessage(message: string) {
    if (this.toastComponent) {
      console.log('showing message');
      this.toastComponent.showToast(message);
    }
  }
}