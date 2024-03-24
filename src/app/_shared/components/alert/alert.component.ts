import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() isError: boolean = false;
  @Input() errorMessage: string = '';
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  closeAlert() {
    this.close.emit();
  }
}
