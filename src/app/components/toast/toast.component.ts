import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'toast.component.html',
  styleUrls: ['toast.component.scss']
})

export class ToastComponent implements OnDestroy {
  isShowToast: boolean = false;
  duration: number = 2500;
  toastType?: string;
  toastMessage?: string;

  private toastTypeSubscription: Subscription;
  private toastMessageSubscription: Subscription;

  constructor(private toastService: ToastService) {
    this.toastTypeSubscription = this.toastService.toastType$.subscribe(type => this.toastType = type);
    this.toastMessageSubscription = this.toastService.toastMessage$.subscribe(message => {
      this.toastMessage = message;
      this.showToast();
    });
  }

  showToast() {
    this.isShowToast = true;

    setTimeout(() => {
      this.hideToast();
    }, this.duration);
  }

  hideToast() {
    this.isShowToast = false;
  }

  ngOnDestroy() {
    this.toastTypeSubscription.unsubscribe();
    this.toastMessageSubscription.unsubscribe();
  }
}
