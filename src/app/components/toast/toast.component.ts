import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  isShowToast: boolean = false;
  duration: number = 3500; 
  toastType?: 'Success' | 'Error'; 
  toastMessage?: string; 

  showToast() {
    this.isShowToast = true;

    setTimeout(() => {
      this.isShowToast = false;
    }, this.duration);
  }

  hideToast() {
    this.isShowToast = false;
  }
}
