import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastTypeSubject = new Subject<string>();
  private toastMessageSubject = new Subject<string>();

  toastType$ = this.toastTypeSubject.asObservable();
  toastMessage$ = this.toastMessageSubject.asObservable();

  constructor() { }

  showSuccessToast(message: string) {
    this.toastTypeSubject.next('Success');
    this.toastMessageSubject.next(message);
  }

  showErrorToast(message: string) {
    this.toastTypeSubject.next('Error');
    this.toastMessageSubject.next(message);
  }
}
