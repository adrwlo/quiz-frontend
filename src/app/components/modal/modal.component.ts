import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() modalTitle: string = '';
  @Input() modalMessage: string = '';
  @Output() saveChanges: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  onSaveChanges() {
    this.saveChanges.emit();
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}
