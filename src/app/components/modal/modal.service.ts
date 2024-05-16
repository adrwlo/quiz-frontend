import { Injectable } from '@angular/core';

import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private myModal: bootstrap.Modal | null = null; 

  constructor() { }
  
  showModal() {
    const modalElement = document.getElementById('myModal');

    if (modalElement) {
      this.myModal = new bootstrap.Modal(modalElement);
      this.myModal.show();
    } 
  }

  hideModal() {
    if (this.myModal) {
      this.myModal.hide();
    } 
  }
}
