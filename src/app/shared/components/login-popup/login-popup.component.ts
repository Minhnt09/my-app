import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [],
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.scss'
})
export class LoginPopupComponent {
  @Output() closePopup = new EventEmitter<void>();
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  close() {
    this.closePopup.emit();
  }
}
