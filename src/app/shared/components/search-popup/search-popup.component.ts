import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.scss']
})
export class SearchPopupComponent {

  @Input() isSearchOpen = false;    // Nhận trạng thái từ file cha
  @Output() closeEvent = new EventEmitter<void>();

  keyword = '';

  closeSearch() {
    this.keyword = '';
    this.closeEvent.emit();   // Báo cho file cha đóng popup
  }
}
